import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { fetchArticleAsync } from '../action';
import config from '../../config';

// view files
import Article from '../views/archive/article.jsx';

class Archive extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(fetchArticleAsync(this.fetchData, renderProps.params.id));
  }

  static fetchData(id) {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts/${id}`, {
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
    return this.props.handleFetch(this.props.params.id, Archive.fetchData);
  }

  render() {
    return (
      <Article {...this.props} />
    );
  }
}
Archive.propTypes = {
  params: React.PropTypes.object,
};

// Connect to Redux
function mapStateToProps(state) {
  return {
    article: state.app.article,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(id, callback) {
      return dispatch(fetchArticleAsync(callback, id));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Archive);
