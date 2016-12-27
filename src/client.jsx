import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import { routes } from './routes.jsx';
import { configureStore } from './store';
import { appReducer } from './reducers/appReducer';
import { rootReducer } from './reducers/rootReducer';
import { archiveReducer } from './reducers/archiveReducer';

// 1. Reducers
const reducers = combineReducers({
  root: rootReducer,
  app: appReducer,
  archive: archiveReducer,
  routing: routerReducer,
});

// 2. States
const rootState = {
  inputValue: '',
  searchValue: '',
};
const preloadedState = window.__PRELOADED_STATE__.app;
const archiveState = {
  tag: [],
};
const initialState = {
  root: rootState,
  app: preloadedState,
  archive: archiveState,
};

// 3. Middleware
const middleware = () => applyMiddleware(
  thunk,
  routerMiddleware(browserHistory),
);

// Make Store
const store = configureStore(reducers, initialState, middleware());

// History
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.querySelector('.content')
);
