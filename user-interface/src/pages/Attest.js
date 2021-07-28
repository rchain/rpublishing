import React, { useState, useEffect } from "react";
import "./pages.css";
import "../components/index.css";

const Publish = () => {
  const [connectWallet, setconnectWallet] = useState(false);
  const onClick = () => setconnectWallet(true);

  return (
    <div className="publish-page">
      <button
        type="submit"
        value="Search"
        onClick={onClick}
        className="btn btn-wallet"
      >
        Connect Wallet
      </button>
      {connectWallet ? <Upload /> : <PreUserAuth />}
    </div>
  );
};

const PreUserAuth = () => (
  <section className="practice">
    <aside></aside>
    <section>
      <main className="prac-main">
        <section className="container-fluid prac-main-container">
          <h2>Connect Wallet to Continue!</h2>
        </section>
      </main>
    </section>
  </section>
);

const Upload = () => {
  const file = JSON.parse(localStorage.getItem("document"));

  const style = {
    width: "18rem",
  };

  return (
    <section className="practice">
      <aside></aside>
      <section>
        <main className="prac-main">
          <section className="container-fluid prac-main-container">
            <h3>Welcome, Magnum Photos</h3>
            {file ? (
              <div className="card" style={style}>
                <img
                  src="https://res.cloudinary.com/david405/image/upload/v1627482973/Eve_Arnold_Monroe_unpublished_1955_nnjaau.jpg"
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <ul className="card-text">
                    <li>Title: {file.title}</li>
                    <li>Copies: {file.copies}</li>
                    <li>Price(USD): {file.price}</li>
                  </ul>
                </div>
              </div>
            ) : (
              <h5>No photos to attest</h5>
            )}
          </section>
        </main>
      </section>
    </section>
  );
};
export default Publish;
