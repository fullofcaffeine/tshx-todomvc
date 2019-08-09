import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../client/App';

export default () => ReactDOMServer.renderToString(<App />);
