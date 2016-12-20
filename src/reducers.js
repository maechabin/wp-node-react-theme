export const appReducer = (state = {}, action) => {
  console.log('reduce!!!!!!!');
  console.log(state);
  console.log(action);
  switch (action.type) {
    case 'fetch_article':
      console.log('update!!!!');
      return Object.assign({}, state, {
        article: action.data,
      });
    case 'clear_article':
      return Object.assign({}, state, {
        article: {},
      })
    case 'fetch_index':
      return Object.assign({}, state, {
        index: action.data,
      });
    default:
      return state;
  }
};
