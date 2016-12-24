import React from 'react';
import config from '../../../config';

const Footer = props => (
  <footer className="footer">
    &copy; 2017 <address>{config.blogTitle}</address>
  </footer>
);

export default Footer;
