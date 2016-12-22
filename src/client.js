import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, browserHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import { routes } from './routes';
import { configureStore } from './store';
import { appReducer } from './reducers/appReducer';
import { rootReducer } from './reducers/rootReducer';

// 1. Reducers
const reducers = combineReducers({
  root: rootReducer,
  app: appReducer,
  routing: routerReducer,
});

// 2. States
const rootState = {
  searchValue: '',
};
const preloadedState = window.__PRELOADED_STATE__.app;
const initialState = {
  root: rootState,
  app: preloadedState,
};

// 3. Middleware
const middleware = (thunk, browserHistory) => {
  return applyMiddleware(thunk, routerMiddleware(browserHistory));
};

// Make Store
const store = configureStore(reducers, initialState, middleware(thunk, browserHistory));

// History
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.querySelector('.content')
);
