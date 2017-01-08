import React from 'react';

const ArticleDate = (props) => {
  function formatDate(date) {
    const dividedDate = date.split('T')[0].split('-');
    return `${dividedDate[0]}年${dividedDate[1]}月${dividedDate[2]}日`;
  }

  return (
    <p>
      <time>{formatDate(props.article.date)}</time>
    </p>
  );
};
ArticleDate.propTypes = {
  article: React.PropTypes.shape({
    date: React.PropTypes.string,
  }),
};

export default ArticleDate;
