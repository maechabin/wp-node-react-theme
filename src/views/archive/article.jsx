import React from 'react';
import Showdown from 'showdown';

const Article = (props) => {
  console.log('article');
  console.log(props.article.id);
  console.log(props.params.id);
  const rawMarkup = (contentType) => {
    const converter = new Showdown.Converter();
    const markup = converter.makeHtml(props.article[contentType].rendered.toString());
    return { __html: markup };
  };

  const article = (props.article.id != props.params.id) ? '' : (
    <div>
      <h2>{props.article.title.rendered}</h2>
      <p>
        <date>{props.article.date}</date>
      </p>
      <div dangerouslySetInnerHTML={rawMarkup('content')} />
    </div>
  );

  return (
    <article className="article">{article}</article>
  );
};

export default Article;
