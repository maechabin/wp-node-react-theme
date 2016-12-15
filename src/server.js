import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { createMemoryHistory, match, RouterContext } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
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
// app.use(express.static('dist'));
app.use(handleRender);

function handleRender(req, res) {
  const reducers = combineReducers({
    app: appReducer,
    routing: routerReducer,
  });
  const preloadedState = { data: {} };
  const initialState = {
    app: preloadedState,
  };
  const memoryHistory = createMemoryHistory(req.url);
  const store = createStore(
    reducers,
    initialState,
    applyMiddleware(thunk, routerMiddleware(memoryHistory))
  );

  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      return res.status(500).send(error.message);
    } else if (redirectLocation) {
      return res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      console.dir(renderProps.components[renderProps.components.length - 1]);
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
