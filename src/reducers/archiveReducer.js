import { GET_TAG_NAME } from '../actions/archiveAction';

export const archiveReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_TAG_NAME:
      return Object.assign({}, state, {
        tag: action.payload,
      });
    default:
      return state;
  }
};
