import React from 'react';
import { Link } from 'react-router';
import Showdown from 'showdown';

const IndexList = (props) => {
  console.log(props);
  function rawMarkup(content) {
    const converter = new Showdown.Converter();
    const markup = converter.makeHtml(content.toString());
    return { __html: markup };
  }

  const list = (props.resetList && props.routingKey !== '') ? '' : props.index.map(
    item => (
      <li key={item.id}>
        <p>{}</p>
        <Link to={`/archive/${item.id}`}>{item.title.rendered}</Link>
        <p>{item.date}</p>
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
  index: React.PropTypes.array,
};

export default IndexList;
