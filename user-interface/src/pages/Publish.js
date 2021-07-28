import React, { useState } from 'react';
import UploadDocument from '../components/UploadDocument';
import "./pages.css";

const Publish = () => {
    const [connectWallet, setconnectWallet] = useState(false)
    const onClick = () => setconnectWallet(true)
    
    return (
          <div className="publish-page">
        <button type="submit" value="Search" onClick={onClick} className="btn btn-wallet">Connect Wallet</button>
        { connectWallet ? <Upload /> : <PreUserAuth /> }
      </div>
    )
  }

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
)
  
  const Upload = () => (
        <UploadDocument />
    );

export default Publish;
