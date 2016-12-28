import { FETCH_INDEX, FETCH_CATEGORY, FETCH_TAG } from '../actions/action';

export const indexReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_INDEX:
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
