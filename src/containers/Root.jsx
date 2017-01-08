import React from 'react';
import { connect } from 'react-redux';

import { changeValue, setSearchValue } from '../actions/rootAction';

// view files
import Header from '../views/root/Header.jsx';
import Footer from '../views/root/Footer.jsx';
import Sidebar from '../views/root/Sidebar.jsx';

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
};

// Connect to Redux
function mapStateToProps(state) {
  return {
    inputValue: state.root.inputValue,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleChange(keyword) {
      dispatch(changeValue(keyword));
    },
    handleSend(keyword) {
      dispatch(setSearchValue(keyword));
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Root);
