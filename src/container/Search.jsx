import React from 'react';
import { connect } from 'react-redux';
import Showdown from 'showdown';
import fetch from 'node-fetch';
import { searchArticleAsync } from '../action.js';
import config from '../../config.js';
import _ from 'lodash';

import List from '../jsx/index/list.jsx';

class Search extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(searchArticleAsync(this.fetchData, renderProps.params.keyword));
  }

  static fetchData(keyword) {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts?filter[s]=${keyword}`, {
      method: 'get',
      mode: 'cors',
    }).then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        return console.dir(res);
      }
    });
  }

  componentWillMount() {
    console.log(this.props);
    return this.props.handleFetch(this.props.params.keyword, Search.fetchData);
  }

  render() {
    return (
      <List {...this.props} />
    );
  }
}

// Connect to Redux
function mapStateToProps(state) {
  return {
    index: state.app.index,
    keyword: state.root.searchValue,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(keyword, callback) {
      return dispatch(searchArticleAsync(callback, keyword));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
