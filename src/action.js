import { FETCH_ARTICLE, CLEAR_ARTICLE, FETCH_INDEX, CHANGE_VALUE } from '../constants';

// Action creator
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
      (res) => dispatch(fetchArticle(res))
    );
  }
}

// Action createMemoryHistory
export function clearArticle() {
  return {
    type: CLEAR_ARTICLE,
  }
}

// Action creator
export function fetchIndex(payload) {
  return {
    type: FETCH_INDEX,
    payload,
  }
}
// redux-thunk
export function fetchIndexAsync(callback) {
  return dispatch => {
    return callback().then(
      (res) => dispatch(fetchIndex(res))
    );
  }
}


// 検索
// fetchIndexでディスパッチ
// redux-thunk
export function searchArticleAsync(callback, keyword) {
  return dispatch => {
    return callback(keyword).then(
      (res) => dispatch(fetchIndex(res))
    );
  }
}

export function changeValue(payload) {
  return {
    type: CHANGE_VALUE,
    payload,
  }
}
