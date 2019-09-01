import { handleActions } from 'redux-actions';
import * as types from './types';

const defaultState = {
  currentUser: {}
};

export default handleActions(
  {
    [types.LOGIN_SUCCESS]: (state, { payload }) => ({
      currentUser: payload
    }),
    [types.LOGOUT]: state => ({ currentUser: {} })
  },
  defaultState
);
