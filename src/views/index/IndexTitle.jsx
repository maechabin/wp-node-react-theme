import React from 'react';

const IndexTitle = (props) => {
  const pathname = props.location.pathname.split('/')[1];
  const getCategory = categoryList => slug => categoryList.map(
    category => (category.slug === slug ? category.name : null),
  );
  const getTitle = (name) => {
    switch (name) {
      case 'search':
        return `「${props.params.keyword}」の検索結果`;
      case 'category': {
        const getCategoryid = getCategory(props.category);
        const categoryName = getCategoryid(props.params.category).find(i => i != null);
        return `「${categoryName}」カテゴリの記事一覧`;
      }
      case 'tag':
        return `「${props.params.tag}」タグの記事一覧`;
      default:
        return '';
    }
  };
  const total = (props.resetList && props.routingKey !== '') ? '' : `全 ${props.total} 件`;

  return (
    <div>
      <h2>{getTitle(pathname)}</h2>
      <p>{total}</p>
    </div>
  );
};

export default IndexTitle;
