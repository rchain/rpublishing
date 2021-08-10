import React from 'react';

interface publicDocumentView {
  connected: string;
  registryUri: string;
}

const PublicStore: React.FC<publicDocumentView> = props => {
    console.log(props);

    return (
        <div>
            Hello Marketplace
        </div>
    )
}

export default PublicStore;