import React from 'react';
import { connect } from 'react-redux';
import fetch from 'node-fetch';
import { searchArticleAsync, resetList, saveRoutingKey } from '../actions/indexAction';
import config from '../../config';

// view files
import IndexComp from '../views/index/IndexComp.jsx';

class Tag extends React.Component {
  static handleFetch(dispatch, renderProps) {
    return dispatch(
      searchArticleAsync(this.fetchData, renderProps.params.tag, renderProps.params.page),
    );
  }

  static fetchData(tag, page = 1) {
    const params = `?context=embed&filter[tag]=${tag}&per_page=${config.perPage}&page=${page}`;
    return fetch(`${config.blogUrl}/wp-json/wp/v2/posts${params}`, {
      method: 'get',
      mode: 'cors',
    }).then((res) => {
      if (res.status === 200) {
        return [res.json(), res.headers._headers];
      }
      return console.dir(res);
    });
  }

  componentDidMount() {
    return [
      this.props.handleInit(this.props.routingKey),
      this.props.handleFetch(this.props.params.tag, Tag.fetchData, this.props.params.page),
    ];
  }

  componentWillUpdate(nextProps) {
    if (nextProps.params.page !== '' && nextProps.params.page !== this.props.params.page) {
      return [
        this.props.handleFetch(
          this.props.params.tag,
          Tag.fetchData,
          nextProps.params.page),
      ];
    }
    return false;
  }

  render() {
    return (
      <IndexComp {...this.props} />
    );
  }
}
Tag.propTypes = {
  routingKey: React.PropTypes.string,
  handleInit: React.PropTypes.func,
  handleFetch: React.PropTypes.func,
};

// Connect to Redux
function mapStateToProps(state) {
  return {
    index: state.index.index,
    resetList: state.index.resetList,
    total: Number(state.index.total),
    totalPages: Number(state.index.totalPages),
    currentPage: state.index.currentPage,
    routingKey: state.routing.locationBeforeTransitions.key,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    handleFetch(tag, callback, page) {
      return dispatch(searchArticleAsync(callback, tag, page));
    },
    handleInit(key) {
      return [resetList(), saveRoutingKey(key)].map(
        action => dispatch(action),
      );
    },
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Tag);
