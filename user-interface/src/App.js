import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from './pages/Home';
import Publish from "./pages/Publish";
//import ConnectWallet from "./components/ConnectWallet";

class App extends Component {

  render() {
    return (
    <div>
      <Router>
      <div>
        <ul className="navbar">
          <li>
            <Link to="/" className="btn home-nav">Home</Link>
          </li>
          <li>
            <Link to="/publishers" className="btn btn-publish">Publish</Link>
          </li>
        </ul>

       
        <Switch>
        <Route exact path="/">
            <Home />
          </Route>
          <Route path="/publishers">
            <Publish />
          </Route>
        </Switch>
      </div>
    </Router>

      </div>
    );
  }
}

export default App;
