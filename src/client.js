import React from 'react';
import ReactDOM from 'react-dom';
import { combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { Router, browserHistory} from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux';

import { routes } from './routes';
import { configureStore } from './store';
import { appReducer } from './reducers';

const reducers = combineReducers({
  app: appReducer,
  routing: routerReducer,
});

const preloadedState = window.__PRELOADED_STATE__.app;
const initialState = {
  app: preloadedState,
};

const middleware = (thunk, browserHistory) => {
  return applyMiddleware(thunk, routerMiddleware(browserHistory))
}

const store = configureStore(reducers, initialState, middleware(thunk, browserHistory));

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>{routes}</Router>
  </Provider>,
  document.querySelector('.content')
);
