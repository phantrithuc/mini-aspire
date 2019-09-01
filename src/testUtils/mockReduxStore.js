import configureStore from 'redux-mock-store';

export const initMockStore = (initialState = {}, middlewares = []) => {
  return configureStore(middlewares)(initialState);
};
