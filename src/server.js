import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './jsx/app.jsx';
import fetch from 'node-fetch';

const app = express();
const router = express.Router();

app.use(express.static('dist'));

app.get('/archive/:id(\\d+)', (req, res) => {
  console.log(req.params.id);
  const fullPage = (serverSideRenderingContent, initProps) => {
    // const pops = safeStringify(initProps);
    return `
      <!doctype html>
      <html>
        <head>
          <meta charset="utf-8">
          <title>Lifegadget</title>
        </head>

        <body>
          <div class="content">
            ${serverSideRenderingContent}
          </div>
        </body>
      </html>
    `;
  };

  fetch(`http://localhost:8080/wordpress/wp-json/wp/v2/posts/${req.params.id}`, {
    method: "get",
    mode: 'cors'
  }).then((response) => {
    if (response.status === 200) {
      return response.json();
    } else {
      console.dir(response);
    }
  }).then((json) => {
    console.log(json.content.rendered);
    const initProps = json.content.rendered;
    const serverSideRenderingContent = ReactDOMServer.renderToString(<App data={initProps} />);
    const renderFullPage = fullPage(serverSideRenderingContent, initProps);
    res.send(
      renderFullPage
    );
  }).catch((response) => console.dir(response));
});

app.listen(3000, () => {
  console.log('Hello app listening on port 3000!');
});
