import { FETCH_ARTICLE, GET_TAG_NAME } from '../actions/archiveAction';

export const archiveReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ARTICLE:
      return Object.assign({}, state, {
        article: action.payload,
        currentId: action.payload.id,
        gettedTag: false,
      });
    case GET_TAG_NAME:
      return Object.assign({}, state, {
        tag: action.payload,
        gettedTag: true,
      });
    default:
      return state;
  }
};
