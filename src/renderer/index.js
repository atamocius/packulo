import '../node_modules/normalize.css/normalize.css';
import '~assets/fonts/amble.css';
import '~index.scss';

import React from 'react';
import ReactDOM from 'react-dom';

import App from '~App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
