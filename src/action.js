const FETCH_ARTICLE = 'fetch_article';
const CLEAR_ARTICLE = 'clear_article';
const FETCH_INDEX = 'fetch_index';

// Action createStore
export function fetchArticle(data) {
  return {
    type: FETCH_ARTICLE,
    data,
  };
}
// redux-thunk
export function fetchArticleAsync(callback, id) {
  return dispatch => {
    return callback(id).then(
      (apiResult) => dispatch(fetchArticle(apiResult))
    );
  }
}

// Action createMemoryHistory
export function clearArticle() {
  return {
    type: CLEAR_ARTICLE,
  }
}

// Action createStore
export function fetchIndex(data) {
  return {
    type: FETCH_INDEX,
    data,
  }
}
// redux-thunk
export function fetchIndexAsync(callback) {
  return dispatch => {
    return callback().then(
      (apiResult) => dispatch(fetchIndex(apiResult))
    );
  }
}
