import React from 'react';
import { Link } from 'react-router';

import IndexTitle from './IndexTitle.jsx';
import IndexList from './IndexList.jsx';
import Pagination from './Pagination.jsx';

const IndexComp = (props) => {
  return (
    <main className="index">
      <IndexTitle {...props} />
      <IndexList {...props} />
      <Pagination {...props} />
    </main>
  );
};
IndexComp.propTypes = {
  resetList: React.PropTypes.bool,
  routingKey: React.PropTypes.string,
  index: React.PropTypes.array,
};

export default IndexComp;
