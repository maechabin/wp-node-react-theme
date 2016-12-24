import { FETCH_ARTICLE, FETCH_INDEX } from '../action';

export const appReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ARTICLE:
      return Object.assign({}, state, {
        article: action.payload,
      });
    case FETCH_INDEX:
      return Object.assign({}, state, {
        index: action.payload,
      });
    default:
      return state;
  }
};
