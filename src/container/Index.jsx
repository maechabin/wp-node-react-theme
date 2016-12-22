import React from 'react';
import { connect } from 'react-redux';
import Showdown from 'showdown';
import fetch from 'node-fetch';
import { fetchIndexAsync } from '../action.js';
import config from '../../config.js';
import _ from 'lodash';

import List from '../jsx/index/list.jsx';

class Index extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(fetchIndexAsync(this.fetchData));
  }

  static fetchData() {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts`, {
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
    return this.props.handleFetch(Index.fetchData);
  }

  render() {
    return (
      <List {...this.props} />
    );
  };
}

// Connect to Redux
function mapStateToProps(state) {
  console.log('state: ');
  console.dir(state.app.index);
  return {
    index: state.app.index,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(callback) {
      return dispatch(fetchIndexAsync(callback));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
