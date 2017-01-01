import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { searchArticleAsync, resetList, saveRoutingKey } from '../actions/indexAction';
import config from '../../config';

// view files
import List from '../views/index/List.jsx';

class Search extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(searchArticleAsync(this.fetchData, renderProps.params.keyword));
  }

  static fetchData(keyword) {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts?filter[s]=${keyword}`, {
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
      this.props.handleFetch(this.props.params.keyword, Search.fetchData),
    ];
  }

  componentWillUpdate(nextProps) {
    if (nextProps.keyword !== '' && nextProps.keyword !== this.props.params.keyword) {
      return this.props.handleFetch(nextProps.keyword, Search.fetchData);
    }
    return false;
  }

  render() {
    return (
      <div>
        {this.props.keyword}
        <List {...this.props} />
      </div>
    );
  }
}
Search.propTypes = {
  params: React.PropTypes.object,
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
    routingKey: state.routing.locationBeforeTransitions.key,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(keyword, callback) {
      return dispatch(searchArticleAsync(callback, keyword));
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
)(Search);
