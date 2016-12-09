export const appReducer = (state, action) => {
  console.log('reduce!!!!!!!');
  console.log(state);
  console.log(action);
  switch (action.type) {
    case 'UPDATE':
      console.log('update!!!!');
      return Object.assign({}, state, {
        data: action.data,
      });
    default:
      return state;
  }
};
