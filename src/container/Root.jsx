import React from 'react';
import { connect } from 'react-redux';

import { changeValue } from '../action.js';
import Header from '../jsx/root/Header.jsx';
import Footer from '../jsx/root/Footer.jsx';
import Sidebar from '../jsx/root/Sidebar.jsx';

class Root extends React.Component {

  render() {
    return (
      <div>
        <Header {...this.props} />
        {this.props.children}
        <Sidebar />
        <Footer />
      </div>
    );
  }
}
Root.propTypes = {
  children: React.PropTypes.object,
}

// Connect to Redux
function mapStateToProps(state) {
  console.log(state);
  return {
    searchValue: state.root.searchValue,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleChange(keyword) {
      dispatch(changeValue(keyword));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Root);
