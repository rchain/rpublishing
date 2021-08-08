import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as rchainToolkit from 'rchain-toolkit';
import React, { Suspense, useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import {
  IonContent,
  IonItem,
  IonInput,
  IonLabel,
  IonButton,
  IonSlides,
  IonSlide,
  IonGrid,
  IonRow,
  IonCol,
  IonToggle,
  IonLoading,
} from '@ionic/react';
import './LoginView.scoped.css';
import { HistoryState, getPlatform } from '../store';

import NoIdentityScreen from '../components/identity/NoIdentityScreen';
//import CreateIdentityScreen from "../components/identity/CreateIdentityScreen";
import { ReactComponent as RChainLogo } from '../assets/rchain.svg';

interface LoginViewProps {
  platform: string;
  action: string;
  init: (a: {
    registryUri: string;
    privateKey: string;
    platform: string;
  }) => void;
}
const LoginViewComponent: React.FC<LoginViewProps> = props => {
  const history = useHistory();
  const [privateKey, setPrivateKey] = useState<string>('');
  const [registryUri, setRegistryUri] = useState<string>('');

  return (
    <IonContent>
      <IonSlides>
        <IonSlide>
          <React.Fragment>
            <div className="login">
              <h2>What would you like to do?</h2>

              <div className="container">
                {/* Publisher */}
                <div className="LoadButtonDiv">
                  <IonButton
                    onClick={async () => {
                      props.init({
                        registryUri:
                          'gusp3piz6fbsdqyogbwg7kcqta3c49sxtc9fug96spsw51gsnag5br',
                        privateKey:
                          '6428f75c09db8b3a260fc1dcb1c93619bd3eecf6787b003ddc6ba5e87025c177',
                        platform: props.platform,
                      });
                    }}
                  >
                    Publish
                  </IonButton>
                </div>
                {/* Attestor */}
                <div className="LoadButtonDiv">
                  <IonButton
                    onClick={async () => {
                      props.init({
                        registryUri:
                          '3ef5rdmo78rzufwkcagb6t6jcd9646sna7rqn71c351mms954w7t17',
                        privateKey:
                          '963a3d9828f03ba67fcfd7d13be7d905416a2864ef0d7527c4646d18be29d476',
                        platform: props.platform,
                      });
                    }}
                  >
                    Attest
                  </IonButton>
                </div>
                {/* Buyer */}
                <div className="LoadButtonDiv">
                  <IonButton
                    onClick={async () => {
                      props.init({
                        registryUri:
                          'y5y1ix3gefdjmrpg6qmeb678sxodhf865emciftaybw14bh6qam539',
                        privateKey:
                          '6dfd785d7dea6e4adcec0879b8ee4260c6ab8b9250e36b0bc4170b1ee6ddc566',
                        platform: props.platform,
                      });
                    }}
                  >
                    Buy
                  </IonButton>
                </div>
              </div>
            </div>
          </React.Fragment>
        </IonSlide>
      </IonSlides>
    </IonContent>
  );
};
export const LoginView = connect(
  (state: HistoryState) => {
    return {
      platform: getPlatform(state),
    };
  },
  (dispatch: Dispatch) => {
    return {
      init: (a: {
        registryUri: string;
        privateKey: string;
        platform: string;
      }) => {
        dispatch({
          type: 'INIT',
          payload: {
            platform: a.platform,
            authorised: true,
            privateKey: a.privateKey,
            publicKey: rchainToolkit.utils.publicKeyFromPrivateKey(
              a.privateKey as string
            ),
            registryUri: a.registryUri,
          },
        });
      },
    };
  }
)(LoginViewComponent);

export default LoginView;
