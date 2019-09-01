import { post } from 'axios';
import { authUrl } from './endpoints';

export function isAuthenticated() {
  return localStorage.getItem('access_token');
}
export function login(email, password) {
  return post(`${authUrl}/login`, {
    email,
    password
  }).then(response => {
    localStorage.setItem('access_token', response.data.access_token);
    return response.data.access_token;
  });
}

export function logout() {
  localStorage.removeItem('access_token');
}

export function getCurrentUser(accessToken) {
  return JSON.parse(accessToken);
}
