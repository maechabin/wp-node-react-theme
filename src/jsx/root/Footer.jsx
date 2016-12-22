import React from 'react';
import config from '../../../config.js';

const Footer = props => {
  return (
    <footer className="footer">
      &copy; 2017 <address>{config.blogTitle}</address>
    </footer>
  );
}

export default Footer;
