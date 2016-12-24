import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { searchArticleAsync } from '../action';
import config from '../../config';
import _ from 'lodash';

// view files
import List from '../views/index/list.jsx';

class Tag extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(searchArticleAsync(this.fetchData, renderProps.params.tag));
  }

  static fetchData(tag) {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts?filter[tag]=${tag}`, {
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
    return this.props.handleFetch(this.props.params.tag, Tag.fetchData);
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
    handleFetch(tag, callback) {
      return dispatch(searchArticleAsync(callback, tag));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tag);
