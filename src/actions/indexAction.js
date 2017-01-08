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

// 任意のIDのアイキャッチ画像の取得、保存
export const SAVE_MEDIA = 'SAVE_MEDIA';
export function saveMedia(payload) {
  return {
    type: SAVE_MEDIA,
    payload,
  }
}
export function saveMediaAsync(id) {
  return (dispatch) => {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/media/${id}`, {
      method: 'get',
      mode: 'cors',
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.dir(res);
    }).then(res => console.log(res));
  }
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

export const FETCH_USER = 'FETCH_USER';
export function fetchUser(payload) {
  return {
    type: FETCH_USER,
    payload,
  };
}
export function fetchUserAsync() {
  return (dispatch) => {
    return fetch(`${config.blogUrl}/wp-json/wp/v2/users`, {
      method: 'get',
      mode: 'cors',
    }).then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      return console.dir(res);
    }).then(
      res => dispatch(fetchUser(res)),
    );
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
      res => Promise.resolve(res[0]).then(
        index => dispatch(fetchIndex({ index, page: res[1] })),
      ),
    );
  };
}

export function searchArticleAsync(callback, keyword, page) {
  return (dispatch) => {
    return callback(keyword, page).then(
      res => Promise.resolve(res[0]).then(
        index => dispatch(fetchIndex({ index, page: res[1] })),
      ),
    );
  };
}
