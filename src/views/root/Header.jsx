import React from 'react';
import { Link } from 'react-router';
import config from '../../../config';
import SearchForm from './SearchForm.jsx';

const Header = props => (
  <header className="header">
    <h1>
      <Link to="/">{config.blogTitle}</Link>
    </h1>
    <SearchForm {...props} />
  </header>
);

export default Header;
