import { put, takeEvery } from 'redux-saga/effects';
import * as rchainToolkit from 'rchain-toolkit';
import { deflate } from 'pako';
import { v4 } from 'uuid';
import Swal from 'sweetalert2';

import KeyResolver from 'key-did-resolver';
import { getResolver as getRchainResolver } from 'rchain-did-resolver';
import { Secp256k1Provider } from 'key-did-provider-secp256k1';
import { DID } from 'dids';
import { parse } from 'did-resolver';
import { encodeBase64 } from 'dids/lib/utils';

import { Document, store, getBagsData } from '../';
import replacer from '../../utils/replacer';
import { getPrivateKey, HistoryState } from '../index';
import { Users } from '../../users/users';

const { purchaseTokensTerm } = require('rchain-token');

const purchaseBag = function*(action: {
  type: string;
  payload: { bagId: string; registryUri: string };
}) {
  console.log('purchase-bag', action.payload);
  const state: HistoryState = store.getState();
    const bagsData = getBagsData(state);
    console.log(bagsData);

  const publicKey = state.reducer.publicKey;
  const privateKey = yield getPrivateKey(state);

  const did = new DID({
    resolver: { ...(yield getRchainResolver()), ...KeyResolver.getResolver() },
  });
  const authSecret = Buffer.from(privateKey, 'hex');
  const provider = new Secp256k1Provider(authSecret);

  yield did.authenticate({ provider: provider });

  const document =
      bagsData[`${action.payload.registryUri}/${action.payload.bagId}`];
    console.log(document);
  if (!document) {
    console.error('bagData/document not found');
    return;
  }

    let i = '0';
    let owned = "owned"
  let newBagId = action.payload.bagId;
  if (!document.signatures['0']) {
  } else if (!document.signatures['1']) {
    i = '1';
    newBagId = `${action.payload.bagId} ${owned}`;
  } else if (!document.signatures['2']) {
    i = '2';
    newBagId = `${action.payload.bagId.slice(
      0,
      action.payload.bagId.length - 3
    )} ${owned}`;
  } else {
    console.error('Signature 0, 1 and 2 are already on document');
    return;
  }

  const signedDocument = {
    ...document,
    data: Buffer.from(document.data, 'utf-8').toString('base64'),
    date: document.date,
    //parent: "did:rchain:" + addressFromBagId(action.payload.registryUri, action.payload.bagId),
  };

  const fileDocument = {
    ...signedDocument,
  } as Document;

  let recipient;

    recipient =
      'did:rchain:nqnzmihah5nxsyhr5eknztbwc9krc8myoqgnfcttun8ebx3u5i17jm';


  const parsedDid = parse(recipient);
  const addr = parsedDid.id;

  const { jws, linkedBlock } = yield did.createDagJWS(fileDocument);
  const jwe = yield did.createDagJWE(
    { jws: jws, data: encodeBase64(linkedBlock) },
    [recipient],
    {
      protectedHeader: {
        alg: 'A256GCMKW',
      },
    }
  );

  const stringifiedJws = JSON.stringify(jwe, replacer);
  const deflatedJws = deflate(stringifiedJws);
  const gzipped = Buffer.from(deflatedJws).toString('base64');

  let priceAsString: any = localStorage.getItem('price');
    let parsePrice: number = JSON.parse(priceAsString);
    let priceInRev: number = parsePrice * 100000000;

  const payload = {
    publicKey: publicKey,
    newBagId: newBagId,
    bagId: '0',
    quantity: 1,
    price: 1,
    bagNonce: v4().replace(/-/g, ''),
    data: gzipped,
  };

  did.deauthenticate();

  const term2 = purchaseTokensTerm(addr as string, payload);
  
  const publisherRevAddress =
    '11113kteb9dsCVYZPiFBMAnLYdjvnqNf9wV2aTg5ecAtKHXYUBDGo';
  const PRIVATE_KEY = Users.buyer.PRIVATE_KEY;
  const PUBLIC_KEY = rchainToolkit.utils.publicKeyFromPrivateKey(PRIVATE_KEY);
  const userRevAddress = rchainToolkit.utils.revAddressFromPublicKey(PUBLIC_KEY);
    
    const term = `match [${userRevAddress}, ${publisherRevAddress}, ${priceInRev}] {
  [revAddrFrom, revAddrTo, amount] => {
    new rl(\`rho:registry:lookup\`), RevVaultCh in {
      rl!(\`rho:rchain:revVault\`, *RevVaultCh) |
      for (@(_, RevVault) <- RevVaultCh) {
        new vaultCh, vaultTo, revVaultkeyCh,
        deployerId(\`rho:rchain:deployerId\`),
        deployId(\`rho:rchain:deploy\`)
        in {
          @RevVault!("findOrCreate", revAddrFrom, *vaultCh) |
          @RevVault!("findOrCreate", revAddrTo, *vaultTo) |
          @RevVault!("deployerAuthKey", *deployerId, *revVaultkeyCh) |
          for (@vault <- vaultCh; key <- revVaultkeyCh; _ <- vaultTo) {
            match vault {
              (true, vault) => {
                new resultCh in {
                  @vault!("transfer", revAddrTo, amount, *key, *resultCh) |
                  for (@result <- resultCh) {
                    match result {
                      (true , _ ) => deployId!((true, "Transfer successful (not yet finalized)."))
                      (false, err) => deployId!((false, err))
                    }
                  }
                }
              }
              err => {
                deployId!((false, "REV vault cannot be found or created."))
              }
            }
          }
        }
      }
    }
    
    
  }
}`;
  
  console.log(term);

  let validAfterBlockNumberResponse;
  try {
    validAfterBlockNumberResponse = JSON.parse(
      yield rchainToolkit.http.blocks(state.reducer.readOnlyUrl, {
        position: 1,
      })
    )[0].blockNumber;
  } catch (err) {
    console.log(err);
    throw new Error('Unable to get last finalized block');
  }

  const timestamp = new Date().getTime();
  const deployOptions = yield rchainToolkit.utils.getDeployOptions(
    'secp256k1',
    timestamp,
    term2,
    privateKey,
    publicKey as string,
    1,
    4000000000,
    validAfterBlockNumberResponse
  );

  const deployOptions2 = yield rchainToolkit.utils.getDeployOptions(
    'secp256k1',
    timestamp,
    term,
    PRIVATE_KEY,
    PUBLIC_KEY as string,
    1,
    4000000000,
    validAfterBlockNumberResponse
  );

  yield rchainToolkit.http.deploy(state.reducer.validatorUrl, deployOptions2);

  //rchainToolkit.http.deploy(state.reducer.validatorUrl, deployOptions2);

  yield put({
    type: 'PURCHASE_BAG_COMPLETED',
    payload: {},
  });
    
    Swal.fire({
      text: 'Purchase is in progress',
      showConfirmButton: false,
      timer: 30000,
    });

    function notify() {
        Swal.fire({
            title: 'Success!',
            text: 'Purchase complete',
            showConfirmButton: false,
            timer: 10000,
        })
    }
    setTimeout(() => { notify() }, 30000);

    // setTimeout(() => {
    //   window.location.reload();
    // }, 30000);
  return true;
};

export const purchaseBagSaga = function*() {
  yield takeEvery('PURCHASE_BAG', purchaseBag);
};
