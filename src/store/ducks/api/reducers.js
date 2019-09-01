import { handleActions } from 'redux-actions';
import * as types from './types';

const defaultState = {
  numberCallInProgress: 0
};

export default handleActions(
  {
    [types.BEGIN_CALL]: state => ({
      numberCallInProgress: state.numberCallInProgress + 1
    }),
    [types.END_CALL]: state => ({
      numberCallInProgress: state.numberCallInProgress - 1
    })
  },
  defaultState
);
