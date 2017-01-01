import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { searchArticleAsync, resetList, saveRoutingKey } from '../actions/indexAction';
import config from '../../config';

// view files
import List from '../views/index/List.jsx';

class Tag extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(searchArticleAsync(this.fetchData, renderProps.params.tag));
  }

  static fetchData(tag) {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts?filter[tag]=${tag}`, {
      method: 'get',
      mode: 'cors',
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.dir(res);
    });
  }

  componentDidMount() {
    return [
      this.props.handleInit(this.props.routingKey),
      this.props.handleFetch(this.props.params.tag, Tag.fetchData),
    ];
  }

  render() {
    return (
      <List {...this.props} />
    );
  }
}
Tag.propTypes = {
  routingKey: React.PropTypes.string,
  handleInit: React.PropTypes.func,
  handleFetch: React.PropTypes.func,
};

// Connect to Redux
function mapStateToProps(state) {
  return {
    index: state.index.index,
    resetList: state.index.resetList,
    routingKey: state.routing.locationBeforeTransitions.key,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(tag, callback) {
      return dispatch(searchArticleAsync(callback, tag));
    },
    handleInit(key) {
      return [resetList(), saveRoutingKey(key)].forEach(
        action => dispatch(action),
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tag);
