import React from 'react';
import ReactDOM from 'react-dom';
import UploadDocument from './UploadDocument';

it('It should mount', () => {
  const div = document.createElement('div');
  ReactDOM.render(<UploadDocument />, div);
  ReactDOM.unmountComponentAtNode(div);
});