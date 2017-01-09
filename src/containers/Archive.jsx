import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { fetchArticleAsync, getTagNameAsync } from '../actions/archiveAction';
import config from '../../config';

// view files
import Article from '../views/archive/Article.jsx';

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
    return Promise.all([
      this.props.handleFetch(this.props.params.id, Archive.fetchData),
    ]).then(() => {
      if (this.props.gettedTag === false && Object.prototype.toString.call(this.props.article.tags) === '[object Array]') {
        return this.props.handleGet(this.props.article.tags);
      }
      return false;
    });
  }

  render() {
    return (
      <Article {...this.props} />
    );
  }
}
Archive.propTypes = {
  article: React.PropTypes.shape({
    tags: React.PropTypes.array,
  }),
  params: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
  gettedTag: React.PropTypes.bool,
  handleFetch: React.PropTypes.func,
  handleGet: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    category: state.root.category,
    user: state.root.user,
    article: state.archive.article,
    tags: state.archive.tags,
    gettedTag: state.archive.gettedTag,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(id, callback) {
      return dispatch(fetchArticleAsync(callback, id));
    },
    handleGet(array) {
      return dispatch(getTagNameAsync(array));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Archive);
