import React from 'react';

const ArticleTitle = (props) => {
  return (
    <h2>{props.article.title.rendered}</h2>
  );
};
ArticleTitle.propTypes = {
  article: React.PropTypes.shape({
    title: React.PropTypes.shape({
      rendered: React.PropTypes.string,
    }),
  }),
};

export default ArticleTitle;
