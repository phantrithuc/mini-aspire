import React from 'react';
import { shallow } from 'enzyme';
import { useDispatch } from 'react-redux';
import { applyApiService } from 'services/apiService';
import { login, getCurrentUser } from 'services/authService';
import AuthContainer from './AuthContainer';
import { FORM_ERROR } from 'final-form';

jest.mock('react-redux');
jest.mock('services/apiService');
jest.mock('services/authService');

describe('AuthContainer', () => {
  const userAccount = { email: 'user@aspire.com', password: 'password' };
  const setup = () => {
    const mockDispatch = jest.fn();
    const mockPush = jest.fn();
    useDispatch.mockImplementation(() => mockDispatch);
    login.mockImplementation(() => {});
    const props = {
      history: {
        push: mockPush
      }
    };
    const wrapper = shallow(<AuthContainer {...props}></AuthContainer>);
    return { wrapper, mockDispatch, login, mockPush };
  };
  it('should call login when handling submit from LoginComponent', async () => {
    const { wrapper, login, mockDispatch } = setup();
    const p = Promise.resolve();
    applyApiService.mockImplementation(() => p);
    await wrapper
      .find('LoginComponent')
      .props()
      .handleSubmit(userAccount);
    expect(applyApiService).toHaveBeenCalledWith(
      mockDispatch,
      login,
      userAccount.email,
      userAccount.password
    );
  });
  it('should dispatch parsed token to store', async () => {
    getCurrentUser.mockImplementation(() => 'parsedToken');
    const { wrapper, mockDispatch } = setup();
    const p = Promise.resolve('token');
    applyApiService.mockImplementation(() => p);
    await wrapper
      .find('LoginComponent')
      .props()
      .handleSubmit(userAccount);
    expect(mockDispatch).toHaveBeenCalledWith({
      payload: 'parsedToken',
      type: 'mini-aspire/auth/LOGIN_SUCCESS'
    });
  });

  it('should redirect to "/" when login is success', async () => {
    const { wrapper, mockPush } = setup();
    const p = Promise.resolve('token');
    applyApiService.mockImplementation(() => p);
    await wrapper
      .find('LoginComponent')
      .props()
      .handleSubmit(userAccount);
    expect(mockPush).toHaveBeenCalledWith('/');
  });
  it('should return FORM_ERROR login is failed', async () => {
    const { wrapper } = setup();
    const p = Promise.reject();
    applyApiService.mockImplementation(() => p);
    const result = await wrapper
      .find('LoginComponent')
      .props()
      .handleSubmit(userAccount);
    expect(result).toEqual({ [FORM_ERROR]: 'Wrong user name or password' });
  });
});
