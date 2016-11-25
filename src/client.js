import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './reducers';
import App from './jsx/Archive.jsx';

const preloadedState = window.__PRELOADED_STATE__;

const store = createStore(reducer, preloadedState);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('.content')
);
