import React from 'react';
import { useDispatch } from 'react-redux';
import { actions as authActions } from 'store/ducks/auth';
import { login, getCurrentUser } from 'services/authService';
import { applyApiService } from 'services/apiService';
import LoginComponent from './LoginComponent';
import { LoginModalStyled } from './AuthStyled';
import { FORM_ERROR } from 'final-form';

export const AuthContainer = props => {
  const dispatch = useDispatch();
  const submit = async ({ email, password }) => {
    try {
      const accessToken = await applyApiService(
        dispatch,
        login,
        email,
        password
      );
      dispatch(authActions.loginSuccess(getCurrentUser(accessToken)));
      props.history.push('/');
    } catch (error) {
      return { [FORM_ERROR]: 'Wrong user name or password' };
    }
  };
  return (
    <LoginModalStyled>
      <LoginComponent handleSubmit={submit} />
    </LoginModalStyled>
  );
};

export default AuthContainer;
