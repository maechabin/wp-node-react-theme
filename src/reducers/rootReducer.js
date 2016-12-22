import { CHANGE_VALUE } from '../../constants';

export const rootReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_VALUE:
      return Object.assign({}, state, {
        searchValue: action.payload,
      });
    default:
      return state;
  }
};
