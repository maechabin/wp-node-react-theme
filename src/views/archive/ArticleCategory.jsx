import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const ArticleCategory = (props) => {
  const getCategory = categoryList => id => categoryList.map(
    (category, i) => (category.id === id ? i : null),
  );
  const getCategoryName = getCategory(props.category);
  const category = _.isEmpty(props.article.categories) ? '' : props.article.categories.map(
    (id) => {
      const CategoryId = getCategoryName(id).find(i => i != null);
      return (
        <span key={id}>
          <Link to={`/category/${props.category[CategoryId].slug}`}>{props.category[CategoryId].name}</Link>
        </span>
      );
    },
  );

  return (
    <div>{category}</div>
  );
};
ArticleCategory.propTypes = {
  article: React.PropTypes.shape({
    categories: React.PropTypes.array,
  }),
  category: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default ArticleCategory;
