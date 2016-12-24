import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { fetchIndexAsync } from '../action';
import config from '../../config';
import _ from 'lodash';

// view files
import List from '../views/index/list.jsx';

class Index extends React.Component {
  static handleFetch(dispatch) {
    return dispatch(fetchIndexAsync(this.fetchData));
  }

  static fetchData() {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts`, {
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
    console.log('index');
    return this.props.handleFetch(Index.fetchData);
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
    handleFetch(callback) {
      return dispatch(fetchIndexAsync(callback));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Index);
