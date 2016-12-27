import React from 'react';
import { Link } from 'react-router';

const ArticleBreadcrumb = props => {
  return (
    <ul>
      <li><Link to="/">ホーム</Link></li>
    </ul>
  );
};

export default ArticleBreadcrumb;
