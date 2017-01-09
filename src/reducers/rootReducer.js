import { CHANGE_VALUE, SET_SEARCH_VALUE, FETCH_CATEGORY, FETCH_USER } from '../actions/rootAction';

export const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return Object.assign({}, state, {
        inputValue: action.payload,
      });
    case SET_SEARCH_VALUE:
      return Object.assign({}, state, {
        searchValue: action.payload,
      });
    case FETCH_CATEGORY:
      return Object.assign({}, state, {
        category: action.payload,
      });
    case FETCH_USER:
      return Object.assign({}, state, {
        user: action.payload,
      });
    default:
      return state;
  }
};
