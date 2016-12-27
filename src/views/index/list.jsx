import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const List = props => {
  const list = _.isEmpty(props.index) ? '' : props.index.map(
    item => (
      <li key={item.id}>
        <Link to={`/archive/${item.id}`}>{item.title.rendered}</Link>
        <p>{item.date}</p>
      </li>
    ),
  );
  return (
    <main className="index">
      <ul>{list}</ul>
    </main>
  );
};

export default List;
