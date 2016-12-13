import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory} from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { routes, blogStore, createServerApp } from './universal';
import { appReducer } from './reducers';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(
  appReducer,
  preloadedState,
  applyMiddleware(thunk)
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>{routes}</Router>
  </Provider>,
  document.querySelector('.content')
);
