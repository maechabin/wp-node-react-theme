import { FETCH_INDEX, FETCH_CATEGORY, FETCH_TAG, RESET_LIST, SAVE_ROUTING_KEY } from '../actions/indexAction';

export const indexReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_ROUTING_KEY:
      return Object.assign({}, state, {
        routingKey: action.payload,
      });
    case RESET_LIST:
      return Object.assign({}, state, {
        resetList: true,
      });
    case FETCH_INDEX:
      return Object.assign({}, state, {
        index: action.payload,
        resetList: false,
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
