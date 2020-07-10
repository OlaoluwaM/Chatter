import React from 'react';
import ReactDOM from 'react-dom';
import App from '../app/components/App';

import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <div>Ola</div>
  </React.StrictMode>,
  document.getElementById('root')
);

module.hot.accept();
