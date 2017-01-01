import React from 'react';
import { Link } from 'react-router';

const ArticleTag = (props) => {
  const tag = props.gettedTag === false && props.tags.length === 0 ? '' : props.tags.map(tags => (
    <Link to={`/tag/${tags.slug}`} key={tags.slug}>{tags.name}</Link>
  ));
  return (
    <span className="article__tag">{tag}</span>
  );
};
ArticleTag.propTypes = {
  gettedTag: React.PropTypes.bool.isRequired,
};

export default ArticleTag;
