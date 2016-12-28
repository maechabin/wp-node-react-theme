import config from '../../config';
import fetch from 'node-fetch';

export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export function fetchCategory(payload) {
  return {
    type: FETCH_CATEGORY,
    payload,
  };
}
export function fetchCategoryAsync() {
  return dispatch => {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/categories`, {
      method: 'get',
      mode: 'cors',
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.dir(res);
    }).then(
      res => dispatch(fetchCategory(res)),
    );
  };
}

export const FETCH_TAG = 'FETCH_TAG';
export function fetchTag(payload) {
  return {
    type: FETCH_TAG,
    payload,
  };
}
export function fetchTagAsync() {
  return dispatch => {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/tags`, {
      method: 'get',
      mode: 'cors',
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.dir(res);
    }).then(
      res => dispatch(fetchTag(res)),
    );
  };
}

// Action creator
export const FETCH_INDEX = 'FETCH_INDEX';
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

export const CHANGE_VALUE = 'CHANGE_VALUE';
export function changeValue(payload) {
  return {
    type: CHANGE_VALUE,
    payload,
  };
}

export const SET_SEARCH_VALUE = 'SET_SEARCH_VALUE';
export function setSearchValue(payload) {
  return {
    type: SET_SEARCH_VALUE,
    payload,
  };
}
