import React from 'react';

import IndexTitle from './IndexTitle.jsx';
import IndexList from './IndexList.jsx';
import Pagination from './Pagination.jsx';

const IndexComp = props => (
  <main className="index">
    <IndexTitle {...props} />
    <IndexList {...props} />
    <Pagination {...props} />
  </main>
);

export default IndexComp;
