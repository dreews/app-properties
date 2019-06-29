import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

it('Render Router wrapper', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router />, div);
  ReactDOM.unmountComponentAtNode(div);
});
