import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createRootReducer from './ducks';
import * as authService from 'services/authService';
export const getInitialState = () =>
  !authService.isAuthenticated()
    ? {}
    : {
        auth: {
          currentUser: authService.getCurrentUser(
            localStorage.getItem('access_token')
          )
        }
      };
export const history = createBrowserHistory();

const configureStore = preloadedState => {
  const composeEnhancers =
    process.env.NODE_ENV === 'development'
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ //add support for Redux dev tools
      : compose;
  const store = createStore(
    createRootReducer(history), // root reducer with router state
    preloadedState,
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history) // for dispatching history actions
      )
    )
  );

  return store;
};

export default configureStore;
