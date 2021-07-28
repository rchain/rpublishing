import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import Home from "./pages/Home";
import Publish from "./pages/Publish";
import Attest from "./pages/Attest";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalState: true,
    };

    this.handleShow = this.handleShow.bind(this);
  }

  handleShow() {
    this.setState({ modalState: !this.state.modalState });
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <div>
              <div
                className={
                  "modal fade" +
                  (this.state.modalState ? " show d-block" : " d-none")
                }
                tabIndex="-1"
                role="dialog"
              >
                <div className="modal-dialog modal-dialog-centered" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Welcome to Arnold NFT</h5>
                      <button
                        type="button"
                        className="close"
                        onClick={this.handleShow}
                      >
                        <span>&times;</span>
                      </button>
                    </div>
                    <div className="modal-body">What would you like to do?</div>
                    <div className="modal-footer">
                      
                        <Link to="/home" className="btn home-publish" onClick={this.handleShow}>
                          Buy
                        </Link>
                      
                     
                        <Link to="/publishers" className="btn btn-publish" onClick={this.handleShow}>
                          Publish
                        </Link>
                      
                        <Link to="/attest" className="btn btn-publish" onClick={this.handleShow}>
                          Attest
                        </Link>
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Switch>
              <Route exact path="/home">
                <Home />
              </Route>
              <Route path="/publishers">
                <Publish />
              </Route>
              <Route exact path="/attest">
                <Attest />
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
