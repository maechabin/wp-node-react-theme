import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import App from './jsx/App.jsx';
import Index from './jsx/Index.jsx';
import Archive from './jsx/Archive.jsx';
import Search from './jsx/Search.jsx';

export const routes = (
  <Route path="/" component={App}>
    <IndexRoute component={Index} />
    <Route path="/archive/:id" component={Archive} />
    <Route path="/search/:keywords" component={Search} />
  </Route>
);
