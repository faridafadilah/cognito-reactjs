import { getAccessToken } from './auth';

export default function authHeader() {
  let accessToken = localStorage.getItem('accessToken');
  
  if (accessToken) {
    // return { 'x-access-token': accessToken };
    return { Authorization: 'Bearer ' + accessToken };
  } else {
    return {};
  }
}