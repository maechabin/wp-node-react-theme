import fetch from 'node-fetch';
import config from '../../config';

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
