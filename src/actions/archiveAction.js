import config from '../../config';
import fetch from 'node-fetch';

// Article系
// TagIDからTag名取得

export const GET_TAG_NAME = 'GET_TAG_NAME';
export function getTagName(payload) {
  return {
    type: GET_TAG_NAME,
    payload,
  };
}

export function getTagNameAsync(array) {
  return dispatch => {
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
        res => res,
      ),
    );
    return dispatch(getTagName(tags));
  };
}
