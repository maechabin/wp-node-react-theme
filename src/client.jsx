import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import { routes } from './routes.jsx';
import { configureStore } from './store';
import { indexReducer } from './reducers/indexReducer';
import { rootReducer } from './reducers/rootReducer';
import { archiveReducer } from './reducers/archiveReducer';

// 1. Reducers
const reducers = combineReducers({
  root: rootReducer,
  index: indexReducer,
  archive: archiveReducer,
  routing: routerReducer,
});

// 2. States
const rootState = window.__PRELOADED_STATE__.root;
const indexState = window.__PRELOADED_STATE__.index;
const archiveState = window.__PRELOADED_STATE__.archive;
const initialState = {
  root: rootState,
  index: indexState,
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
