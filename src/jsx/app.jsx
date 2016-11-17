import React from 'react';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import fetch from 'node-fetch';
import Showdown from 'showdown';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      archive: props.data,
    }
  };
  rawMarkup(contentType) {
    const converter = new Showdown.Converter();
    const rawMarkup = converter.makeHtml(this.state.archive[contentType].rendered.toString());
    return { __html: rawMarkup };
  };

  render() {
    return (
      <div>
        <h1>
          <a href="/">Lifegadget</a>
        </h1>
        <article>
          <h2>{this.state.archive.title.rendered}</h2>
          <p>
            <date>{this.state.archive.date}</date>
          </p>
          <div dangerouslySetInnerHTML={this.rawMarkup('content')} />
        </article>
      </div>
    );
  };
}
