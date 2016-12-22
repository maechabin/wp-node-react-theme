import { createStore, applyMiddleware } from 'redux';

export const configureStore = (reducers, initialState, middleware) => {
  return createStore(
    reducers,
    initialState,
    middleware,
  );
};
