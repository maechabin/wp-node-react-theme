import React from 'react';
import { connect } from 'react-redux';
import Showdown from 'showdown';
import fetch from 'node-fetch';
import { searchArticleAsync } from '../action.js';
import config from '../../config.js';
import _ from 'lodash';

import List from '../jsx/index/list.jsx';

class Category extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(searchArticleAsync(this.fetchData, renderProps.params.category));
  }

  static fetchData(category) {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts?filter[s]=${category}`, {
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
    return this.props.handleFetch(this.props.params.category, Category.fetchData);
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
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(category, callback) {
      return dispatch(searchArticleAsync(callback, category));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category);
