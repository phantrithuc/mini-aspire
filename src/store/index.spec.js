import configureStore, { getInitialState } from './index';
import { actions as apiActions } from './ducks/api';
import { actions as authActions } from './ducks/auth';

describe('getInitialState', () => {
  it('should have state of current user based on access_token', () => {
    localStorage.setItem('access_token', JSON.stringify({ name: 'name' }));
    const initialState = getInitialState();
    expect(initialState.auth.currentUser.name).toEqual('name');
  });
  it('should not have state of current user if there is no access_token', () => {
    localStorage.removeItem('access_token');
    const initialState = getInitialState();
    expect(initialState).toEqual({});
  });
});

describe('store', () => {
  const setup = () => {
    const store = configureStore(getInitialState());
    const dispatch = store.dispatch;
    return { store, dispatch };
  };
  describe('apiActions', () => {
    it('should have beginCall and endCall to reduce numberCallInProgress state', () => {
      const { store, dispatch } = setup();
      dispatch(apiActions.beginCall());
      expect(store.getState().apiStatus.numberCallInProgress).toEqual(1);
      dispatch(apiActions.endCall());
      expect(store.getState().apiStatus.numberCallInProgress).toEqual(0);
    });
  });

  describe('authActions', () => {
    it('should have loginSuccess to update currentUser state', () => {
      const { store, dispatch } = setup();
      dispatch(authActions.loginSuccess({ name: 'name' }));
      expect(store.getState().auth.currentUser.name).toEqual('name');
    });

    it('should have logout to clear currentUser state', () => {
      const { store, dispatch } = setup();
      dispatch(authActions.loginSuccess({ name: 'name' }));
      dispatch(authActions.logout());
      expect(store.getState().auth.currentUser).toEqual({});
    });
  });
});
