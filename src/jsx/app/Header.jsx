import React from 'react';
import { Link } from 'react-router';
import config from '../../../config.js';
import SearchForm from './SearchForm.jsx';

const Header = props => {
  return (
    <header>
      <h1><Link to="/">{config.blogTitle}</Link></h1>
      <SearchForm />
    </header>
  );
}

export default Header;
