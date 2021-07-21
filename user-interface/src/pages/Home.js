import React from "react";
import PhotoContextProvider from "../context/PhotoContext";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import Header from "../components/Header";
import Item from "../components/Item";
import Search from "../components/Search";
import NotFound from "../components/NotFound";
//import ConnectWallet from "./components/ConnectWallet";

const Home = () => {
  // Prevent page reload, clear input, set URL and push history on submit
 const handleSubmit = (e, history, searchInput) => {
    e.preventDefault();
    e.currentTarget.reset();
    let url = `/search/${searchInput}`;
    history.push(url);
  };

  return (
    <PhotoContextProvider>
    <HashRouter basename="/rpublishing">
      <div className="container">
        <Route
          render={props => (
            <Header
              handleSubmit={handleSubmit}
              history={props.history}
            />
          )}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Redirect to="/nature" />}
          />

          <Route
            path="/nature"
            render={() => <Item searchTerm="close-ups" />}
          />
          <Route path="/civil-rights" render={() => <Item searchTerm="civil-rights" />} />
          <Route path="/travel" render={() => <Item searchTerm="travel" />} />
          <Route path="/wild-life" render={() => <Item searchTerm="wild-life" />} />
          <Route
            path="/search/:searchInput"
            render={props => (
              <Search searchTerm={props.match.params.searchInput} />
            )}
          />
          <Route component={NotFound} />
        </Switch>
      </div>
    </HashRouter>
  </PhotoContextProvider>
)
            }

export default Home;