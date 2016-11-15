import React from 'react';
import fetch from 'node-fetch';
import Showdown from 'showdown';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      title: props.data.title.rendered,
      date: props.data.date,
      content: props.data.content.rendered,
    }
  };
  rawMarkup(contentType) {
    const converter = new Showdown.Converter();
    const rawMarkup = converter.makeHtml(this.state[contentType].toString());
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div>
        <h1>
          <a href="/">Lifegadget</a>
        </h1>
        <article>
          <h2>{this.state.title}</h2>
          <p>
            <date>{this.state.date}</date>
          </p>
          <div dangerouslySetInnerHTML={this.rawMarkup('content')} />
        </article>
      </div>
    );
  };
}
