import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Root from './containers/Root.jsx';
import Index from './containers/Index.jsx';
import Archive from './containers/Archive.jsx';
import Search from './containers/Search.jsx';
import Category from './containers/Category.jsx';
import Tag from './containers/Tag.jsx';

export const routes = (
  <Route path="/" component={Root}>
    <IndexRoute component={Index} />
    <Route path="/:page" component={Index} />
    <Route path="/archive/:id" component={Archive} />
    <Route path="/search/" component={Search} />
    <Route path="/search/:keyword" component={Search} />
    <Route path="/search/:keyword/:page" component={Search} />
    <Route path="/category/:category" component={Category} />
    <Route path="/category/:category/:page" component={Category} />
    <Route path="/tag/:tag" component={Tag} />
    <Route path="/tag/:tag/:page" component={Tag} />
  </Route>
);
