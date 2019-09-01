import { actions as apiActions } from 'store/ducks/api';
export const applyApiService = (dispatch, apiService, ...args) => {
  dispatch(apiActions.beginCall());
  return apiService(...args).finally(() => {
    dispatch(apiActions.endCall());
  });
};
