import express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReactDOMServer from 'react-dom/server';
import fetch from 'node-fetch';
import App from './jsx/App';

const app = express();
const port = 3000;
const router = express.Router();

app.use('/assets', express.static('dist'));
app.use('/assets', express.static('public'));
app.use(express.static('dist'));
app.get('/archive/:id(\\d+)', handleRender);

function fetchData(id, callback) {
  fetch(`http://localhost:8080/wordpress/wp-json/wp/v2/posts/${id}`, {
    method: "get",
    mode: 'cors'
  }).then(response => {
    if (response.status === 200) {
      return response.json()
      .then(
        json => callback(json)
      )
    } else {
      return console.dir(response);
    }
  });
}
function appReducer(state, action) {
  return state;
}
function handleRender(req, res) {
  // console.log(req);
  const id = req.params.id;
  fetchData(id, (apiResult) => {
    const preloadedState = { data: apiResult };
    const store = createStore(appReducer, preloadedState);
    // console.log(preloadedState);
    const html = ReactDOMServer.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const finalState = store.getState();

    res.status(200).send(renderFullPage(html, finalState));
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
          window.__PRELOADED_STATE__ = ${finalState}
        </script>
        <script src="/assets/bundle.js"></script>
      </body>
    </html>
    `;
}

app.listen(
  port, () => console.log(`Hello app listening on port ${port}!`)
);
