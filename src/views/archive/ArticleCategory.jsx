import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const ArticleCategory = props => {
  // const category = props.category[props.article.categories[0] - 1].name;
  const category = _.isEmpty(props.article.categories) ? '' : props.article.categories.map(id => {
    return (
      <span key={id}>
        <Link to={`/category/${props.category[id - 1].slug}`}>{props.category[id - 1].name}</Link>
      </span>
    );
  });
  return (
    <div>{category}</div>
  );
};

export default ArticleCategory;
