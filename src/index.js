import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import ExplainBindingsComponent from './playground';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}

registerServiceWorker();
