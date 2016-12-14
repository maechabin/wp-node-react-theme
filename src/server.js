import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { appReducer } from './reducers';

import serialize from 'serialize-javascript';

import { routes } from './routes';
import App from './jsx/App.jsx';
import Index from './jsx/Index.jsx';
import Archive from './jsx/Archive.jsx';

const app = express();
const port = 3000;
const router = express.Router();

app.use('/assets', express.static('dist'));
app.use('/assets', express.static('public'));
app.use(express.static('dist'));
//app.get('/archive/:id(\\d+)', handleRender);
app.use(handleRender);

function handleRender(req, res) {
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      console.dir(renderProps.components[renderProps.components.length - 1]);
      const preloadedState = { data: {} };
      const store = createStore(
        appReducer,
        preloadedState,
        applyMiddleware(thunk)
      );

      const promises = renderProps.components.map(
        c => c.handleFetch ? c.handleFetch(store.dispatch, renderProps) : Promise.resolve('no fetching')
      );
      Promise.all(promises).then(() => {
        const html = ReactDOMServer.renderToString(
          <Provider store={store}>
            <RouterContext { ...renderProps } />
          </Provider>
        );
        const finalState = store.getState();
        return res.status(200).send(renderFullPage(html, finalState));
      });
    } else {
      return res.status(404).send('Not found');
    }

  });
}
function renderFullPage(html, finalState) {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Lifegadget</title>
        <base href="/">
      </head>

      <body>
        <div class="content">
          ${html}
        </div>
        <script>
          window.__PRELOADED_STATE__ = ${serialize(finalState)}
        </script>
        <script src="/assets/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(
  port, () => console.log(`Hello app listening on port ${port}!`)
);
