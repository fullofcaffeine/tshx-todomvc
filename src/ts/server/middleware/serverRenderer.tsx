import * as React from 'react';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import App from '../../shared/App';
import * as hx from'../../shared/hx';
import Html from '../components/HTML';

const serverRenderer: any = () => (req: express.Request, res: express.Response) => {
  const content = `
//    <App />
    <div id="app"></div>
  `;

//  const state = JSON.stringify(res.locals.store.getState());

  return res.send(
    '<!doctype html>' +
    renderToString(
      <Html
        css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
        scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
      >
        {content}
      </Html>
    )
  );
};

export default serverRenderer;
