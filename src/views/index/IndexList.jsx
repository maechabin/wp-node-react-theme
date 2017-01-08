import React from 'react';
import { Link } from 'react-router';
import Showdown from 'showdown';

const IndexList = (props) => {
  function rawMarkup(content) {
    const converter = new Showdown.Converter();
    const markup = converter.makeHtml(content.toString());
    return { __html: markup };
  }
  function formatDate(date) {
    const dividedDate = date.split('T')[0].split('-');
    return `${dividedDate[0]}年${dividedDate[1]}月${dividedDate[2]}日`;
  }

  const list = (props.resetList && props.routingKey !== '') ? '' : props.index.map(
    item => (
      <li key={item.id}>
        <Link to={`/archive/${item.id}`}>{item.title.rendered}</Link>
        <p><time>{formatDate(item.date)}</time></p>
        <p dangerouslySetInnerHTML={rawMarkup(item.excerpt.rendered)} />
      </li>
    ),
  );
  return (
    <ul>{list}</ul>
  );
};
IndexList.propTypes = {
  resetList: React.PropTypes.bool,
  routingKey: React.PropTypes.string,
  index: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default IndexList;
