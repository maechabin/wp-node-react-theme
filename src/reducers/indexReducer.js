import {
  FETCH_INDEX,
  FETCH_CATEGORY,
  FETCH_USER,
  RESET_LIST,
  SAVE_ROUTING_KEY,
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
        index: action.payload.index,
        total: action.payload.page['x-wp-total'][0],
        totalPages: action.payload.page['x-wp-totalpages'][0],
        resetList: false,
      });
    case SET_CURRENT_PAGE_NUMBER:
      return Object.assign({}, state, {
        currentPage: action.payload,
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
