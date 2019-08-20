import * as React from 'react';
import * as express from 'express';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import App from '../../shared/App';
import Html from '../components/HTML';
import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles';
import theme from '../../shared/mui-theme';

const serverRenderer: any = () => (req: express.Request, res: express.Response) => {
  const sheets = new ServerStyleSheets();

  const content = renderToString(
    sheets.collect(
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    )
  );

  const css = sheets.toString();

//  const state = JSON.stringify(res.locals.store.getState());

  return res.send(
    '<!doctype html>' +
    renderToString(
      <Html
        css={[res.locals.assetPath('bundle.css'), res.locals.assetPath('vendor.css')]}
        scripts={[res.locals.assetPath('bundle.js'), res.locals.assetPath('vendor.js')]}
        inlineStyle={css}
      >
        {content}
      </Html>
    )
  );
};

export default serverRenderer;
