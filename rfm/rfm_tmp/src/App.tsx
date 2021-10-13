import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import * as rchainToolkit from 'rchain-toolkit';
import React, { Suspense, useEffect, useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonRouterOutlet,
  IonLoading,
  IonButton,
  IonIcon,
  IonSlides,
  IonSlide,
  IonLabel
} from '@ionic/react';
import './App.scss';
import './App.scoped.css';
import { Bag, HistoryState } from './store';

import IdentityScreen from './components/identity/IdentityScreen';

import { personCircle, closeCircleOutline } from 'ionicons/icons';

import { Device } from "@capacitor/device";

//import axios from 'axios';
import queryString from 'query-string';

const LoginView = React.lazy(() => import('./views/LoginView'));
const DockListView = React.lazy(() => import('./views/DocListView'));
const PublicStore = React.lazy(() => import('./views/PublicStoreView'));

interface AppProps {
  authorised: boolean;
  isLoading: boolean;
  registryUri: undefined | string;
  user: string;
  bags: { [id: string]: Bag };
  init: (a: { registryUri: string; privateKey: string; user: string }) => void;
  setPlatform: (platform: string) => void;
  setUser: (user: string) => void;
}

interface Demo {
  id: string;
  masterRegistryUri: string;
  publisherPrivKey: string;
  attestorPrivKey: string;
  alicePrivKey: string;
  bobPrivKey: string;
}

const AppComponent: React.FC<AppProps> = props => {
  const redfill = React.useRef(null);
  const [showIdentity, setShowIdentity] = useState(false);
  const [demo, setDemo] = useState<Demo>();


  const identity: any = localStorage.getItem('user'); //TODO

    props.setUser(identity);
    console.log(identity);
  /*
  const shortenName = () => {
    return "did:rchain:" + props.registryUri?.substring(0, 6) + "..." + props.registryUri?.substring(48, 54)
  }
  */

  const ToggleIdentityView = () => {
    setShowIdentity(!showIdentity);
    console.info(showIdentity);
  };

  useEffect(() => {
    const params = queryString.parse(window.location.search) || {};
    console.info("params:");
    console.info(params);
    
    if (params && params.step) {
      const step = params.step || '0';
      localStorage.setItem('tour', step as string);
    }

    setDemo({
      id: "4",
      masterRegistryUri: "barqze8tzwurf1b3s5ah4g45xmx4w8ntmctym6teiq85e5jcq61e5x",
      publisherPrivKey: "b7c30b82c728eaf687a2e908355632718b536a4ae78bd2beb8ab8a1cc9cba4f8",
      attestorPrivKey: "58c66a273702764f3e85be2ab7744e13dd3d8a4cd29574792b60346e3adbeaa1",
      alicePrivKey: "f28f1a7455964110d5988534a5fddd4232896b1f7ee7be4211bd10dc60895b8d",
      bobPrivKey: "3991f937acf943ef4dcaf55c08d8abb35d6959b25b251f81d1fbd8993cf1080b"
    });
    /*
      const existingDemo = localStorage.getItem('demo');
      if (existingDemo) {
        const demo = JSON.parse(existingDemo);
        console.info("DEMO:");
        console.info(demo);
        setDemo(demo);
      }
      else {
        axios.get('http://localhost:8080/pop').then(function (response) {
          // handle success
          console.info(response);
          const demo = response.data as Demo;
          localStorage.setItem('demo', JSON.stringify(demo));
          setDemo(demo);
        })
      }
    */
  }, []);

  useEffect(() => {
    Device.getInfo().then(info => {
      props.setPlatform(info.platform);
    });
  });

  const slideOpts: Record<string, unknown> = {
    initialSlide: 0,
    speed: 400,
  };

  const onSlideChanged = (event: any) => {
    event.target.getActiveIndex().then((value: any) => {
      console.info(value);
    });
  };

  function reload() {
    setTimeout(() => {
    window.location.reload();
  }, 100);
  }


  if (!props.authorised) {
    return (
      <IonRouterOutlet id="main">

        <Route
          exact
          path="/user"
          render={rprops => (
            <Suspense fallback={<IonLoading isOpen={true} />}>
              <LoginView action="user" key={rprops.location.pathname} demo={demo}/>
            </Suspense>
          )}
        />
        <Route
          exact
          path="/user/new"
          render={rprops => (
            <Suspense fallback={<IonLoading isOpen={true} />}>
              <LoginView action="new" key={rprops.location.pathname} demo={demo}/>
            </Suspense>
          )}
        />
        <Route
          exact
          path="/user/restore"
          render={rprops => (
            <Suspense fallback={<IonLoading isOpen={true} />}>
              <LoginView action="restore" key={rprops.location.pathname} demo={demo}/>
            </Suspense>
          )}
        />
        <Route
          path="/"
          exact
          render={rprops => (
            <Suspense fallback={<IonLoading isOpen={true} />}>
              <LoginView action="user" key={rprops.location.pathname} demo={demo}/>
            </Suspense>
          )}
        />
        <Route
          path="*"
          render={rprops => (
            <Suspense fallback={<IonLoading isOpen={true} />}>
              <LoginView action="user" key={rprops.location.pathname} demo={demo}/>
            </Suspense>
          )}
        />
        { /*
        <Route
          path="*"
          render={rprops => (
            <Suspense fallback={<IonLoading isOpen={true} />}>
              <LoginView action="user" key={rprops.location.pathname} demo={demo}/>
            </Suspense>
          )}
        />
          */ }
      </IonRouterOutlet>
    );
  }

  return (
    
    <IonPage id="home-page">
      
      <IonHeader no-border no-shadow className="ion-no-border">
        <IonToolbar className="noSafeAreaPaddingTop">
          <IonTitle
            onClick={() => {
           reload()
          }}
          >RChain NFT</IonTitle>
          <IonButton
            slot="end"
            icon-only
            color="none"
            class="ProfileButton"
            onClick={() => {
              ToggleIdentityView();
            }}
          >
            {showIdentity ? (
              <IonIcon icon={closeCircleOutline} size="large" />
            ) : (
                <div className="UserInfo" >
                  <IonLabel>{props.user}</IonLabel>
                  <IonIcon icon={personCircle} size="large" />
                </div>
              )}
          </IonButton>
        </IonToolbar>
        <div
          className={showIdentity ? 'RedFill show' : 'RedFill hide'}
          ref={redfill}
        >
          <IonContent className="IdentityBG">
            <div
              className={
                showIdentity ? 'ProfilePanel show' : 'ProfilePanel hide'
              }
            >
              <div className="ArrowLeft" />
              <div className="ArrowRight" />
              <IonSlides
                class="IdentityList"
                options={slideOpts}
                pager={true}
                onIonSlideDidChange={onSlideChanged}
              >
                <IonSlide className="IdentitySlide">
                  <IdentityScreen />
                </IonSlide>
              </IonSlides>
            </div>
          </IonContent>
        </div>
      </IonHeader>
      <IonContent>
        { /*<RChainLogo className="BackgroundLogo" /> */ }

        {
          (identity === "buyer" || identity === "buyer2") ? (
                  <Suspense fallback={<IonLoading isOpen={true} />}>
                    <PublicStore
                      registryUri={props.registryUri as string}
                      action="list"
                    />
                  </Suspense>
          )
            :
            (
            <IonRouterOutlet id="main">
              <Route
                exact
                path="/doc/show/:registryUri/:bagId?"
                render={rprops => (
                  <Suspense fallback={<IonLoading isOpen={true} />}>
                    <DockListView
                      registryUri={rprops.match.params.registryUri}
                      bagId={rprops.match.params.bagId}
                      action="show"
                      key={rprops.location.hash}
                    />
                  </Suspense>
                )}
              />
              <Route
                exact
                path="/doc"
                render={rprops => (
                  <Suspense fallback={<IonLoading isOpen={true} />}>
                    <DockListView
                      registryUri={props.registryUri as string}
                      action="list"
                      key={rprops.location.hash}
                    />
                  </Suspense>
                )}
              />
              <Route
                exact
                path="/doc/upload"
                render={rprops => (
                  <Suspense fallback={<IonLoading isOpen={true} />}>
                    <DockListView
                      registryUri={props.registryUri as string}
                      action="upload"
                      key={rprops.location.hash}
                    />
                  </Suspense>
                )}
              />
              <Route
                path="/"
                render={({ location }) => (
                  <Redirect
                    to={{
                      pathname: '/doc',
                      state: { from: location },
                    }}
                  />
                )}
                exact
              />
            </IonRouterOutlet>
          )
        }
      </IonContent>
    </IonPage>
  );
};

export const App = connect(
  (state: HistoryState) => {
    return {
      authorised: state.reducer.authorised,
      registryUri: state.reducer.registryUri,
      user: state.reducer.user,
      bags: state.reducer.bags,
      isLoading: state.reducer.isLoading,
    };
  },
  (dispatch: Dispatch) => {
    return {
      init: (a: { registryUri: string; privateKey: string; user: string}) => {
        dispatch({
          type: 'INIT',
          payload: {
            privateKey: a.privateKey,
            publicKey: rchainToolkit.utils.publicKeyFromPrivateKey(
              a.privateKey as string
            ),
            registryUri: a.registryUri,
            user: a.user
          },
        });
      },
      setPlatform: (platform: string) => {
        dispatch({
          type: 'SET_PLATFORM',
          payload: {
            platform: platform,
          },
        });
      },
      setUser: (user: string) => {
        dispatch({
          type: 'SET_USER',
          payload: {
            user: user,
          }
        })
      }
    };
  }
)(AppComponent);

export default App;
