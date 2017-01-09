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

export const SET_CURRENT_PAGE_NUMBER = 'SET_CURRENT_PAGE_NUMBER';
export function setCurrentPageNumber(payload) {
  return {
    type: SET_CURRENT_PAGE_NUMBER,
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
export function saveMediaAsync(url) {
  return fetch(url, {
    method: 'get',
    mode: 'cors',
  }).then((res) => {
    if (res.status === 200) {
      return res.json();
    }
    return console.dir(res);
  }).then(
    (res2) => {
      return {
        source_url: res2.source_url,
      };
    },
  );
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
        res2 => Promise.all(res2.map(
          res3 => {
            if (res3._links['wp:featuredmedia']) {
              return saveMediaAsync(res3._links['wp:featuredmedia'][0].href);
            }
            return false;
          },
        )).then(res4 => {
          return res2.map((obj, i) => {
            return Object.assign({}, obj, res4[i]);
          });
        }).then(
          index => dispatch(fetchIndex({ index, page: res[1] })),
        ),
      ),
    );
  };
}

// index => dispatch(fetchIndex({ index, page: res[1] })),
// x => saveMediaAsync(x._links['wp:featuredmedia'][0].href, x.id),

export function searchArticleAsync(callback, keyword, page) {
  return (dispatch) => {
    return callback(keyword, page).then(
      res => Promise.resolve(res[0]).then(
        res2 => Promise.all(res2.map(
          res3 => {
            if (res3._links['wp:featuredmedia']) {
              return saveMediaAsync(res3._links['wp:featuredmedia'][0].href);
            }
            return false;
          },
        )).then(res4 => {
          return res2.map((obj, i) => {
            return Object.assign({}, obj, res4[i]);
          });
        }).then(
          index => dispatch(fetchIndex({ index, page: res[1] })),
        ),
      ),
    );
  };
}
