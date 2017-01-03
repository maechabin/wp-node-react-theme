import {
  FETCH_INDEX,
  FETCH_CATEGORY,
  FETCH_TAG, RESET_LIST,
  SAVE_ROUTING_KEY,
  SET_PAGINATION,
  SET_CURRENT_PAGE_NUMBER,
} from '../actions/indexAction';

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
    case SET_PAGINATION:
      return Object.assign({}, state, {
        total: action.payload['x-wp-total'][0],
        totalPages: action.payload['x-wp-totalpages'][0],
      });
    case SET_CURRENT_PAGE_NUMBER:
      return Object.assign({}, state, {
        currentPage: action.payload,
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
