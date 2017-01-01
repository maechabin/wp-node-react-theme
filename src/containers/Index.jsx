import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { fetchIndexAsync, resetList, saveRoutingKey } from '../actions/indexAction';
import config from '../../config';

// view files
import List from '../views/index/List.jsx';

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

  componentDidMount() {
    return [
      this.props.handleInit(this.props.routingKey),
      this.props.handleFetch(Index.fetchData),
    ];
  }

  render() {
    return (
      <List {...this.props} />
    );
  }
}
Index.propTypes = {
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
    handleFetch(callback) {
      return dispatch(fetchIndexAsync(callback));
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
)(Index);
