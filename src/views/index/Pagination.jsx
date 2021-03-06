import React from 'react';
import { Link } from 'react-router';

const Pagination = (props) => {
  const totalPages = Number(props.totalPages);
  const paramsPage = Number(props.params.page) || 1;
  const pager = new Array(5).fill(paramsPage);

  const pathname = props.location.pathname.split('/');

  const path = (name, routeParams) => {
    switch (name) {
      case 'search':
        return `/search/${routeParams.keyword}/`;
      case 'category':
        return `/category/${routeParams.category}/`;
      case 'tag':
        return `/tag/${routeParams.tag}/`;
      default:
        return '/';
    }
  };

  const pagination = pager.map((page, i) => {
    const number = (page > (totalPages - 5) + 1) ? (((totalPages - 5) + 1) - page) + i : i;
    if (page + number > totalPages || page + number < 1) {
      return false;
    }
    if (page + number === paramsPage) {
      return <li className="pagination__link_active" key={page + number}>{page + number}</li>;
    }
    return (
      <li key={page + number}>
        <Link to={`${path(pathname[1], props.routeParams)}${page + number}`}>{page + number}</Link>
      </li>
    );
  });
  const prev = () => {
    if (paramsPage === 1) {
      return <li>前へ</li>;
    }
    if (paramsPage > totalPages - 5) {
      return <li><Link to={`${path(pathname[1], props.routeParams)}${totalPages - 5}`}>前へ</Link></li>;
    }
    return <li><Link to={`${path(pathname[1], props.routeParams)}${paramsPage - 1}`}>前へ</Link></li>;
  };
  const next = () => {
    if (paramsPage >= totalPages) {
      return <li>次へ</li>;
    }
    return <li><Link to={`${path(pathname[1], props.routeParams)}${paramsPage + 1}`}>次へ</Link></li>;
  };
  const pagenationAll = (props.resetList && props.routingKey !== '') ? '' : (
    <ul>
      {prev()}
      {pagination}
      {next()}
    </ul>
  );

  return (
    <div className="pagination">{pagenationAll}</div>
  );
};
Pagination.defaultProps = {
  params: {
    page: 1,
  },
};
Pagination.propTypes = {
  location: React.PropTypes.shape({
    pathname: React.PropTypes.string,
  }),
  params: React.PropTypes.shape({
    page: React.PropTypes.string,
  }),
  resetList: React.PropTypes.bool,
  routingKey: React.PropTypes.string,
  routeParams: React.PropTypes.shape({
    category: React.PropTypes.string,
    keyword: React.PropTypes.string,
    tag: React.PropTypes.string,
  }),
  totalPages: React.PropTypes.number,
};

export default Pagination;
