const UPDATE = 'UPDATE';

// Action createStore
export function updateArticle(data) {
  console.log('action!!!!!!!!!!!!!!!!!!');
  return {
    type: UPDATE,
    data,
  };
}

// thunk
export function updateArticleAsync(callback, id) {
  return dispatch => {
    return callback(id).then(
      (apiResult) => dispatch(updateArticle(apiResult))
    );
  }
}
