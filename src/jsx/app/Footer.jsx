import React from 'react';
import config from '../../../config.js';

const Footer = props => {
  return (
    <footer>
      &copy; 2017 <addoress>{config.blogTitle}</addoress>
    </footer>
  );
}

export default Footer;
