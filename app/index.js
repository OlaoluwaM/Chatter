import React from 'react';
import ReactDOM from 'react-dom';

import App from '../app/components/App';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

import { BrowserRouter as Router } from 'react-router-dom';

import './index.scss';

Amplify.configure(awsconfig);

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

module.hot.accept();
