import React from 'react';
import { connect } from 'react-redux';
import Showdown from 'showdown';

class LifegadgetApp extends React.Component {
  rawMarkup(contentType) {
    const converter = new Showdown.Converter();
    const rawMarkup = converter.makeHtml(this.props.archive[contentType].rendered.toString());
    return { __html: rawMarkup };
  };

  render() {
    return (
      <div>
        <h1>
          <a href="/">Lifegadget</a>
        </h1>
        <article>
          <h2>{this.props.archive.title.rendered}</h2>
          <p>
            <date>{this.props.archive.date}</date>
          </p>
          <div dangerouslySetInnerHTML={this.rawMarkup('content')} />
        </article>
      </div>
    );
  };
}

// Connect to Redux
function mapStateToProps(state) {
  return {
    archive: state.data,
  };
}

const App = connect(
  mapStateToProps
)(LifegadgetApp);

export default App;
