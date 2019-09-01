import { post } from 'axios';
import { isAuthenticated, login, logout } from './authService';

jest.mock('axios');
jest.mock('./endpoints', () => ({ authUrl: 'authUrl' }));
describe('authService', () => {
  it('.isAuthenticated should be based on access_token in localstorage', () => {
    localStorage.setItem('access_token', 'token');
    expect(isAuthenticated()).toBeTruthy();

    localStorage.removeItem('access_token');
    expect(isAuthenticated()).toBeFalsy();
  });
  describe('login', () => {
    it('should send user credentials to auth url ', async () => {
      const email = 'user@aspire.com';
      const password = 'password';
      post.mockImplementation(() => Promise.resolve({ data: 'any' }));
      await login(email, password);
      expect(post).toBeCalledWith('authUrl/login', { email, password });
    });

    it('should set access_token in localstorage and return access_token ', async () => {
      const token = 'token';
      post.mockImplementation(() =>
        Promise.resolve({ data: { access_token: token } })
      );
      const result = await login();
      expect(result).toEqual(token);
      expect(localStorage.getItem('access_token')).toEqual(token);
    });
  });
  it('.logout should remove access_token in localstorage', () => {
    localStorage.setItem('access_token', 'token');
    logout();
    expect(localStorage.getItem('access_token')).toBeNull();
  });
});
