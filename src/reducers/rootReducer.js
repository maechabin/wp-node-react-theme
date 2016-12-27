import { CHANGE_VALUE, SET_SEARCH_VALUE } from '../actions/action';

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
    default:
      return state;
  }
};
