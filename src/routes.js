import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { appReducer } from './reducers';

import App from './jsx/App.jsx';
import Index from './jsx/Index.jsx';
import Archive from './jsx/Archive.jsx';

export const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="archive" component={Archive}>
      <Route path="/archive/:id" component={Archive} />
    </Route>
  </Route>
);
