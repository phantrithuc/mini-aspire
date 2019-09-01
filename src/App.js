import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { ThemeProvider } from 'styled-components';
import theme from './styles/theme';
import configureStore, { getInitialState, history } from './store';
import AppNavigation from './features/navigation/AppNavigation';
import withLoading from './features/enhance/withLoading';
const AppNavigationWithLoading = withLoading(AppNavigation);
const store = configureStore(getInitialState());
class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <ConnectedRouter history={history}>
            <AppNavigationWithLoading />
          </ConnectedRouter>
        </ThemeProvider>
      </Provider>
    );
  }
}

export default App;
