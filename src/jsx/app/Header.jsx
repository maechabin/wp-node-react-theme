import React from 'react';
import { Link } from 'react-router';

const Header = props => {
  return (
    <header>
      <h1><Link to="/">LifeGadget</Link></h1>
    </header>
  );
}

export default Header;
