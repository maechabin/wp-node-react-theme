import fetch from 'node-fetch';
import config from '../../config';

// Action creator
export const FETCH_ARTICLE = 'FETCH_ARTICLE';
export function fetchArticle(payload) {
  return {
    type: FETCH_ARTICLE,
    payload,
  };
}
// redux-thunk
export function fetchArticleAsync(callback, id) {
  return (dispatch) => {
    return callback(id).then(
      res => dispatch(fetchArticle(res)),
    );
  };
}


// TagIDからTag名取得
export const GET_TAG_NAME = 'GET_TAG_NAME';
export function getTagName(payload) {
  return {
    type: GET_TAG_NAME,
    payload,
  };
}

export function getTagNameAsync(array) {
  return (dispatch) => {
    const tags = array.map(
      id => fetch(`${config.blogUrl}/wp-json/wp/v2/tags/${id}`, {
        method: 'get',
        mode: 'cors',
      }).then((res) => {
        if (res.status === 200) {
          return res.json();
        }
        return console.dir(res);
      }).then(
        (res) => {
          return {
            name: res.name,
            slug: res.slug,
          };
        },
      ),
    );
    Promise.all(tags).then(
      (res) => {
        dispatch(getTagName(res));
      },
    );
  };
}
