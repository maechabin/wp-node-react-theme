import React from 'react';

import Header from './app/Header.jsx';
import Footer from './app/Footer.jsx';
import Sidebar from './app/Sidebar.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Sidebar />
        <Footer />
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.object,
}
