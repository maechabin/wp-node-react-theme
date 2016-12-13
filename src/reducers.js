export const appReducer = (state, action) => {
  console.log('reduce!!!!!!!');
  console.log(state);
  console.log(action);
  switch (action.type) {
    case 'fetch_article':
      console.log('update!!!!');
      return Object.assign({}, state, {
        data: action.data,
      });
    case 'fetch_index':
      return Object.assign({}, state, {
        data: action.data,
      })
    default:
      return state;
  }
};
