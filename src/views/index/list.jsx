import React from 'react';
import { Link } from 'react-router';
import _ from 'lodash';

const List = (props) => {
  const list = _.isEmpty(props.index) ? '' : props.index.map(
    item => (
      <div key={item.id}>
        <Link to={`/archive/${item.id}`}>{item.title.rendered}</Link>
        <p>{item.date}</p>
      </div>
    ),
  );
  return (
    <div>
      <main>{list}</main>
    </div>
  );
};

export default List;
