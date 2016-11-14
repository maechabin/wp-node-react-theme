import React from 'react';
import fetch from 'node-fetch';
import Showdown from 'showdown';

export default class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      data: props.data
    }
  };
  rawMarkup() {
    const converter = new Showdown.Converter();
    const rawMarkup = converter.makeHtml(this.state.data.toString());
    return { __html: rawMarkup };
  }

  render() {
    return (
      <div>
        <h1>Lifegadget</h1>
        <article dangerouslySetInnerHTML={this.rawMarkup()} />
      </div>
    );
  };
}
