// Action creator
export const FETCH_ARTICLE = 'fetch_article';
export function fetchArticle(payload) {
  return {
    type: FETCH_ARTICLE,
    payload,
  };
}
// redux-thunk
export function fetchArticleAsync(callback, id) {
  return dispatch => {
    return callback(id).then(
      res => dispatch(fetchArticle(res)),
    );
  };
}

// Action creator
export const FETCH_INDEX = 'fetch_index';
export function fetchIndex(payload) {
  return {
    type: FETCH_INDEX,
    payload,
  };
}
// redux-thunk
export function fetchIndexAsync(callback) {
  return dispatch => {
    return callback().then(
      res => dispatch(fetchIndex(res)),
    );
  };
}


// 検索
// fetchIndexでディスパッチ
// redux-thunk
export function searchArticleAsync(callback, keyword) {
  return dispatch => {
    return callback(keyword).then(
      res => dispatch(fetchIndex(res)),
    );
  };
}

export const CHANGE_VALUE = 'change_value';
export function changeValue(payload) {
  return {
    type: CHANGE_VALUE,
    payload,
  };
}

export const SET_SEARCH_VALUE = 'set_search_value';
export function setSearchValue(payload) {
  return {
    type: SET_SEARCH_VALUE,
    payload,
  };
}
