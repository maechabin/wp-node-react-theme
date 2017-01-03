import fetch from 'node-fetch';
import config from '../../config';

export const RESET_LIST = 'RESET_LISET';
export function resetList() {
  return {
    type: RESET_LIST,
  };
}

export const SAVE_ROUTING_KEY = 'SAVE_ROUTING_KEY';
export function saveRoutingKey(payload) {
  return {
    type: SAVE_ROUTING_KEY,
    payload,
  };
}

export const FETCH_CATEGORY = 'FETCH_CATEGORY';
export function fetchCategory(payload) {
  return {
    type: FETCH_CATEGORY,
    payload,
  };
}
export function fetchCategoryAsync() {
  return (dispatch) => {
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
  return (dispatch) => {
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

export const SET_PAGINATION = 'SET_PAGINATION';
export function setPagination(payload) {
  return {
    type: SET_PAGINATION,
    payload,
  };
}

export const SET_CURRENT_PAGE_NUMBER = 'SET_CURRENT_PAGE_NUMBER';
export function setCurrentPageNumber(payload) {
  return {
    type: SET_CURRENT_PAGE_NUMBER,
    payload,
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
export function fetchIndexAsync(callback, page) {
  return (dispatch) => {
    return callback(page).then(
      res => ([
        Promise.resolve(res[0]).then(index => dispatch(fetchIndex(index))),
        dispatch(setPagination(res[1])),
      ]),
    );
  };
}


// 検索
// fetchIndexでディスパッチ
// redux-thunk
export function searchArticleAsync(callback, keyword, page) {
  return (dispatch) => {
    return callback(keyword, page).then(
      res => ([
        Promise.resolve(res[0]).then(index => dispatch(fetchIndex(index))),
        dispatch(setPagination(res[1])),
      ]),
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
