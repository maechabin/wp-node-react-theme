import React from 'react';

export default class App extends React.component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
