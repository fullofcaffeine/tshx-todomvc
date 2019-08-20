import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from '../shared/App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/statics/service-worker.js');
  }
})();

// TODO Look into HMR
/*if (process.env.NODE_ENV === 'development') {
  if (module.hot) {
      module.hot.accept();
  }

  if (!window.store) {
      window.store = store;
  }
}*/
