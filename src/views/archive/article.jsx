import React from 'react';
import Showdown from 'showdown';

import ArticleBreadcrumb from './ArticleBreadcrumb.jsx';
import ArticleCategory from './ArticleCategory.jsx';
import ArticleDate from './ArticleDate.jsx';
import ArticleTag from './ArticleTag.jsx';
import ArticleTitle from './ArticleTitle.jsx';
import ArticleUser from './ArticleUser.jsx';

const Article = (props) => {
  function rawMarkup(contentType) {
    const converter = new Showdown.Converter();
    const markup = converter.makeHtml(props.article[contentType].rendered.toString());
    return { __html: markup };
  }

  const article = (props.article.id !== Number(props.params.id)) ? '' : (
    <div>
      <ArticleBreadcrumb {...props} />
      <ArticleTitle {...props} />
      <ArticleDate {...props} />
      <ArticleUser {...props} nameOnly />
      <ArticleCategory {...props} />
      <ArticleTag {...props} />
      <div dangerouslySetInnerHTML={rawMarkup('content')} />
      <ArticleCategory {...props} />
      <ArticleTag {...props} />
      <ArticleUser {...props} nameOnly={false} />
    </div>
  );

  return (
    <article className="article">
      {article}
    </article>
  );
};
Article.propTypes = {
  article: React.PropTypes.shape({
    id: React.PropTypes.number,
  }),
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
};

export default Article;
