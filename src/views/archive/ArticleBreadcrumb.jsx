import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const ArticleBreadcrumb = (props) => {
  const getCategory = categoryList => id => categoryList.map(
    (category, i) => (category.id === id ? i : null),
  );
  const getCategoryId = getCategory(props.category);
  const category = _.isEmpty(props.article.categories) ? '' : props.article.categories.map(
    id => getCategoryId(id).find(i => i != null),
  );

  return (
    <ul is itemscope itemtype="http://schema.org/BreadcrumbList" className="breadcrumb">
      <li is itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
        <Link is itemscope itemtype="http://schema.org/Thing" itemprop="item" to="/">
          <span is itemprop="name">ホーム</span>
        </Link>
      </li>
      <li>
        <span>&gt;</span>
      </li>
      <li is itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem">
        <Link is itemscope itemtype="http://schema.org/Thing" itemprop="item" to={`/category/${props.category[category[0]].slug}`}>
          <span is itemprop="name">{props.category[category[0]].name}</span>
        </Link>
      </li>
    </ul>
  );
};
ArticleBreadcrumb.propTypes = {
  article: React.PropTypes.shape({
    categories: React.PropTypes.array,
  }),
  category: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default ArticleBreadcrumb;
