import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import theme from '../shared/mui-theme';
import { ThemeProvider } from '@material-ui/styles';

function Main() {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <App/>
    </ThemeProvider>
  );
}

ReactDOM.hydrate(
  <Main/>,
  document.getElementById('app')
);

(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/statics/service-worker.js');
  }
})();

if (process.env.NODE_ENV === 'development') {
  console.log(module.hot);
  if (module.hot) {
      module.hot.accept();
  }

/*  if (!window.store) {
      window.store = store;
  }*/
}
