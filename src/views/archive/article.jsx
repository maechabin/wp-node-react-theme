import React from 'react';
import Showdown from 'showdown';

import ArticleBreadcrumb from './ArticleBreadcrumb.jsx';
import ArticleCategory from './ArticleCategory.jsx';
import ArticleTag from './ArticleTag.jsx';

const Article = (props) => {
  function rawMarkup(contentType) {
    const converter = new Showdown.Converter();
    const markup = converter.makeHtml(props.article[contentType].rendered.toString());
    return { __html: markup };
  }

  const article = (props.article.id !== Number(props.params.id)) ? '' : (
    <div>
      <ArticleBreadcrumb {...props} />
      <h2>{props.article.title.rendered}</h2>
      <p><date>{props.article.date}</date></p>
      <ArticleCategory {...props} />
      <ArticleTag {...props} />
      <div dangerouslySetInnerHTML={rawMarkup('content')} />
      <ArticleCategory {...props} />
      <ArticleTag {...props} />
    </div>
  );

  return (
    <article className="article">{article}</article>
  );
};
Article.propTypes = {

};

export default Article;
