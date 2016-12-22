import { FETCH_ARTICLE, CLEAR_ARTICLE, FETCH_INDEX } from '../../constants';

export const appReducer = (state = {}, action) => {
  console.log('reduce!!!!!!!');
  console.log(state);
  console.log(action);
  switch (action.type) {
    case FETCH_ARTICLE:
      console.log('update!!!!');
      return Object.assign({}, state, {
        article: action.payload,
      });
    case CLEAR_ARTICLE:
      return Object.assign({}, state, {
        article: {},
      })
    case FETCH_INDEX:
      return Object.assign({}, state, {
        index: action.payload,
      });
    default:
      return state;
  }
};
