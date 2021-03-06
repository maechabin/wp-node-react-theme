import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { searchArticleAsync, resetList, saveRoutingKey } from '../actions/indexAction';
import config from '../../config';

// view files
import IndexComp from '../views/index/IndexComp.jsx';

class Search extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(
      searchArticleAsync(this.fetchData, renderProps.params.keyword, renderProps.params.page),
    );
  }

  static fetchData(keyword, page = 1) {
    const params = `?context=embed&filter[s]=${keyword}&per_page=${config.perPage}&page=${page}`;
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
      method: 'get',
      mode: 'cors',
    }).then((res) => {
      if (res.status === 200) {
        return [res.json(), res.headers._headers];
      }
      return console.dir(res);
    });
  }

  componentDidMount() {
    return [
      this.props.handleInit(this.props.routingKey),
      this.props.handleFetch(this.props.params.keyword, Search.fetchData, this.props.params.page),
    ];
  }

  componentWillUpdate(nextProps) {
    if (nextProps.keyword !== '' && nextProps.keyword !== this.props.params.keyword) {
      return this.props.handleFetch(nextProps.keyword, Search.fetchData, this.props.params.page);
    }
    if (nextProps.params.page !== '' && nextProps.params.page !== this.props.params.page) {
      return [
        this.props.handleFetch(this.props.params.keyword, Search.fetchData, nextProps.params.page),
      ];
    }
    return false;
  }

  render() {
    return (
      <IndexComp {...this.props} />
    );
  }
}
Search.propTypes = {
  params: React.PropTypes.shape({
    keyword: React.PropTypes.string,
    page: React.PropTypes.string,
  }),
  keyword: React.PropTypes.string,
  routingKey: React.PropTypes.string,
  handleInit: React.PropTypes.func,
  handleFetch: React.PropTypes.func,
};

// Connect to Redux
function mapStateToProps(state) {
  return {
    index: state.index.index,
    keyword: state.root.searchValue,
    resetList: state.index.resetList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    routingKey: state.routing.locationBeforeTransitions.key,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(keyword, callback, page) {
      return dispatch(searchArticleAsync(callback, keyword, page));
    },
    handleInit(key) {
      return [resetList(), saveRoutingKey(key)].map(
        action => dispatch(action),
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
