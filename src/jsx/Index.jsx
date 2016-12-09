import React from 'react';
import { connect } from 'react-redux';
import Showdown from 'showdown';

class Index extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <a href="/">Lifegadget</a>
        </h1>
        <article>

        </article>
      </div>
    );
  };
}

// Connect to Redux


export default connect()(Index);
