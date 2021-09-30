import { connect } from 'react-redux';
import React from 'react';
import {
  IonIcon,
  IonItem,
  IonLabel,
  IonItemSliding,
  IonItemOptions,
  IonItemOption,
  IonButton,
} from '@ionic/react';

import { useHistory } from 'react-router';
import { Dispatch } from 'redux';
import { State, Bag, Document, HistoryState } from '../store';
import './MarketItem.scoped.css';

import { document as documentIcon, trash, create } from 'ionicons/icons';
import { bagIdFromAddress } from '../utils/bagIdFromAddress';

interface MarketItemProps {
  bag: Bag;
  registryUri: string;
  id: string;
  awaitsSignature: boolean;
  completed: boolean;
  onlyCompleted: boolean;
  document: Document;
  purchase: (registryUri: string, bagId: string) => void;
}

const MarketItemComponent: React.FC<MarketItemProps> = (
  props: MarketItemProps,
) => {
  const identity = localStorage.getItem('wallet');
  const history = useHistory();

    let priceAsString: any = localStorage.getItem('price');
  let parsePrice: number = JSON.parse(priceAsString);
  console.log(parsePrice);

  return (
    <IonItemSliding className="container">
      <IonItemOptions side="end">
        <IonItemOption
          color="secondary"
          onClick={() => console.log('favorite clicked')}
        >
          <IonIcon icon={create} size="large" />
        </IonItemOption>
        <IonItemOption
          color="danger"
          onClick={() => console.log('share clicked')}
        >
          <IonIcon icon={trash} size="large" />
        </IonItemOption>
      </IonItemOptions>
      <IonItem
        className={`${
          !props.onlyCompleted && Object.keys(props.document.signatures).length > 1
            ? 'with-parent'
            : ''
        } ${props.completed ? 'success' : 'secondary'}`}
        detail={false}
      >
        <div className="mainContainer">
          <div className="IconContainer">
            {['image/png', 'image/jpg', 'image/jpeg'].includes(
              props.document.mimeType
            ) ? (
              <img
                alt={props.document.name}
                src={`data:${props.document.mimeType};base64, ${props.document.data}`}
              />
            ) : (
              <React.Fragment />
            )}
          </div>
          <div className="labelContainer">
            <IonLabel className="ion-text-wrap">
              <h2>{bagIdFromAddress(props.id)}</h2>
            </IonLabel>
            {!props.awaitsSignature && (
              <IonLabel className="signature-ok">
                <b>✓</b>
              </IonLabel>
            )}
            {
              (identity) ? ( undefined ) :
              (<IonButton
              onClick={() => {
                props.purchase(props.registryUri, bagIdFromAddress(props.id));
              }}
            >
              Buy for { parsePrice } rev
            </IonButton>)}
          </div>
        </div>
      </IonItem>
    </IonItemSliding>
  );
};

const MarketItem = connect(
  (state: HistoryState) => {
    return {
      bags: state.reducer.bags,
      bagsData: state.reducer.bagsData,
      state: state,
    };
  },
  (dispatch: Dispatch) => {
    return {
      purchase: (registryUri: string, bagId: string) => {
        dispatch({
          type: 'PURCHASE_BAG',
          payload: {
            bagId: bagId,
            registryUri: registryUri,
          },
        });
      },
    };
  }
)(MarketItemComponent);

export default MarketItem;
