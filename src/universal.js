import React from 'react';
import { Router, Route, RouterContext, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Index from './jsx/Index.jsx';
import App from './jsx/App.jsx';

export const routes = (
  <Route path="/" component={Index}>
    <IndexRoute component={Index} />
    <Route path="archive/:id" component={App} />
  </Route>
);
