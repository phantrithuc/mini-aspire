import { createAction } from 'redux-actions';
import * as types from './types';

const loginSuccess = createAction(
  types.LOGIN_SUCCESS,
  currentUser => currentUser
);
const logout = createAction(types.LOGOUT);
export default { loginSuccess, logout };
