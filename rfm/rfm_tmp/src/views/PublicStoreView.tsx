import React from 'react';
import './PublicStore.scoped.css'

interface PublicDocumentView {
  connected: string;
  registryUri: string;
}

const PublicStore: React.FC<PublicDocumentView> = props => {
    console.log(props);

    return (
      <div className="public-store">
        <h2>NFT Marketplace</h2>
      </div>
    );
}

export default PublicStore;