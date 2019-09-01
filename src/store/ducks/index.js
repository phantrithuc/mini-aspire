import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import apiStatus from './api';
import auth from './auth';

const createRootReducer = history =>
  combineReducers({
    router: connectRouter(history),
    apiStatus,
    auth
  });
export default createRootReducer;
