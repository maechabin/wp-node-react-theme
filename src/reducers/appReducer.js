import { FETCH_ARTICLE, FETCH_INDEX, FETCH_CATEGORY, FETCH_TAG } from '../action';

export const appReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ARTICLE:
      console.log(FETCH_ARTICLE);
      console.log(action.payload);
      return Object.assign({}, state, {
        article: action.payload,
      });
    case FETCH_INDEX:
      console.log(FETCH_INDEX);
      console.log(action.payload);
      return Object.assign({}, state, {
        index: action.payload,
      });
    case FETCH_CATEGORY:
      return Object.assign({}, state, {
        category: action.payload,
      });
    case FETCH_TAG:
      return Object.assign({}, state, {
        tag: action.payload,
      });
    default:
      return state;
  }
};
