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
    return this.props.handleFetch(this.props.params.id, Archive.fetchData);
  }

  componentWillUpdate(nextProps) {
    console.log(this.props.article.tags);
    if (this.props.gettedTag === false) {
      return this.props.handleGet(this.props.article.tags);
    }
  }

  render() {
    console.dir(this.props);
    return (
      <Article {...this.props} />
    );
  }
}
Archive.propTypes = {
  params: React.PropTypes.object,
  handleFetch: React.PropTypes.func,
  handleGet: React.PropTypes.func,
};

// Connect to Redux
function mapStateToProps(state) {
  console.log(state);
  return {
    category: state.index.category,
    tag: state.index.tag,
    article: state.archive.article,
    tags: state.archive.tag,
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
