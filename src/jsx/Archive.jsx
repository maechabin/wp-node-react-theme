import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Showdown from 'showdown';
import fetch from 'node-fetch';
import { fetchArticleAsync, clearArticle } from '../action.js';
import config from '../../config.js';
import _ from 'lodash';

class Archive extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(fetchArticleAsync(this.fetchData, renderProps.params.id));
  }

  static fetchData(id) {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts/${id}`, {
      method: 'get',
      mode: 'cors',
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return console.dir(response);
      }
    });
  }

  rawMarkup(contentType) {
    const converter = new Showdown.Converter();
    const rawMarkup = converter.makeHtml(this.props.article[contentType].rendered.toString());
    return { __html: rawMarkup };
  }

  componentWillMount() {
    if (typeof this.props.article && this.props.params.id !== this.props.article.id) {
      return [
        this.props.handleClearArticle(),
      //this.props.handleFetch(this.props.params.id, Archive.fetchData)
      ];
    }
  }

  componentDidMount() {
    console.log(`id: ${this.props.params.id}`);
    //this.props.handleFetch(this.props.params.id, Archive.fetchData);
    if (_.isEmpty(this.props.article) || this.props.params.id !== this.props.article.id) {
      return [
        //this.props.handleChangeArticleId(this.props.params.id),
        this.props.handleFetch(this.props.params.id, Archive.fetchData)
      ];
    }
  }

  render() {
    const article = (this.props.article === undefined) ? '' : (
      <article>
        <h2>{this.props.article.title.rendered}</h2>
        <p>
          <date>{this.props.article.date}</date>
        </p>
        <div dangerouslySetInnerHTML={this.rawMarkup('content')} />
      </article>
    );
    return (
      <div>
        {article}
      </div>
    );
  }
}

// Connect to Redux
function mapStateToProps(state) {
  console.log('state: ');
  console.dir(state.app.article);
  return {
    article: state.app.article,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(id, callback) {
      return dispatch(fetchArticleAsync(callback, id));
    },
    handleClearArticle() {
      return dispatch(clearArticle());
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Archive);
