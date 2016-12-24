import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { searchArticleAsync } from '../action';
import config from '../../config';
import _ from 'lodash';

// view files
import List from '../views/index/list.jsx';

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

  componentWillMount() {
    return this.props.handleFetch(this.props.params.keyword, Search.fetchData);
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
  handleFetch: React.PropTypes.func,
};

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
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
