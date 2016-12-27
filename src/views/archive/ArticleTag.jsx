import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const ArticleTag = props => {
  return (
    <span>{props.tags}</span>
  );
};

export default ArticleTag;
