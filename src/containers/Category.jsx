import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { searchArticleAsync, resetList, saveRoutingKey } from '../actions/indexAction';
import config from '../../config';

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

  componentDidMount() {
    return [
      this.props.handleInit(this.props.routingKey),
      this.props.handleFetch(this.props.params.category, Category.fetchData),
    ];
  }

  render() {
    return (
      <List {...this.props} />
    );
  }
}
Category.propTypes = {
  routingKey: React.PropTypes.string,
  category: React.PropTypes.string,
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
    handleFetch(category, callback) {
      return dispatch(searchArticleAsync(callback, category));
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
)(Category);
