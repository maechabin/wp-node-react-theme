import React from 'react';
import { Router, Route, RouterContext, IndexRoute } from 'react-router';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk fom 'redux-thunk';
import App from './jsx/App';

export const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={App} />
    <Route path="archive/:id" component={App} />
  </Route>
);
