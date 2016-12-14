import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, browserHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import { routes } from './routes';
import { appReducer } from './reducers';

const preloadedState = window.__PRELOADED_STATE__;
const store = createStore(
  combineReducers({
    appReducer,
    routing: routerReducer,
  }),
  preloadedState,
  applyMiddleware(thunk, routerMiddleware(browserHistory))
);

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} />
  </Provider>,
  document.querySelector('.content')
);
