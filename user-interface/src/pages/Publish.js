import React, { useState } from 'react';
import UploadDocument from '../components/UploadDocument';

const Publish = () => {
    const [connectWallet, setconnectWallet] = useState(false)
    const onClick = () => setconnectWallet(true)
    
    return (
          <div className="publish-page">
        <button type="submit" value="Search" onClick={onClick} className="btn btn-wallet">Connect Wallet</button>
        { connectWallet ? <Upload /> : null }
      </div>
    )
  }
  
  const Upload = () => (
        <UploadDocument />
    );

export default Publish;