import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { searchArticleAsync } from '../actions/action';
import config from '../../config';
import _ from 'lodash';

// view files
import List from '../views/index/List.jsx';

class Category extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(searchArticleAsync(this.fetchData, renderProps.params.category));
  }

  static fetchData(category) {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts?filter[category_name]=${category}`, {
      method: 'get',
      mode: 'cors',
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.dir(res);
    });
  }

  componentWillMount() {
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
    index: state.index.index,
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
  mapDispatchToProps,
)(Category);
