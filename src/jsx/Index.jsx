import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Showdown from 'showdown';
import fetch from 'node-fetch';
import { fetchIndexAsync } from '../action.js'

class Index extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(fetchIndexAsync(this.fetchData));
  }

  static fetchData() {
    return fetch(`http://localhost:8080/wordpress/wp-json/wp/v2/posts`, {
      method: "get",
      mode: 'cors',
    }).then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return console.dir(response);
      }
    });
  }

  componentWillMount() {

  }

  render() {
    console.log(this.props.data[0].title.rendered);
    const list = this.props.data.map(
      item => <div key={item.id}><Link to={`/archive/${item.id}`}>{item.title.rendered}</Link></div>
    );
    return (
      <div>
        <h1>
          <Link to={`/`}>Lifegadget</Link>
        </h1>
        <article>{list}</article>
      </div>
    );
  };
}

// Connect to Redux
function mapStateToProps(state) {
  return {
    data: state.data,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(callback, dispatch) {
      dispatch(fetchIndexAsync(callback));
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
