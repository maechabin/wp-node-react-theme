import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Root from './container/Root.jsx';
import Index from './container/Index.jsx';
import Archive from './container/Archive.jsx';
import Search from './container/Search.jsx';
import Category from './container/Category.jsx';
import Tag from './container/Tag.jsx';

export const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Index} />
    <Route path="/archive/:id" component={Archive} />
    <Route path="/search/:keyword" component={Search} />
    <Route path="/category/:category" component={Category} />
    <Route path="/tag/:tag" component={Tag} />
  </Route>
);
