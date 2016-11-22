import React from 'react';
import ReactDOM from 'react-dom';
import App from './jsx/App';

const preloadedState = window.__PRELOADED_STATE__;
ReactDOM.render(
  <App { ...preloadedState } />, document.querySelector('.content')
);
