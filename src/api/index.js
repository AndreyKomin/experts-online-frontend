import axios from 'axios';
import mockData from './mockData';
import { capitalizeFirstLetter } from './mockFunc';


const apiUrl = (process.env.NODE_ENV !== 'production') ? `http://0.0.0.0:7000` : `http://api.эксперты-онлайн.рф`;

axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {

  const originalRequest = error.config;

  if (error.response.status === 401 && !originalRequest._retry && error.response.request.responseURL !== `${apiUrl}/api/auth`) {

    originalRequest._retry = true;

    const token = window.localStorage.getItem('refreshToken');
    return axios.put(`${apiUrl}/api/auth`, { token })
      .then(({data}) => {
        window.localStorage.setItem('token', data.token);
        window.localStorage.setItem('refreshToken', data.refreshToken);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
        originalRequest.headers['Authorization'] = 'Bearer ' + data.token;
        return axios(originalRequest);
      });
  }

  return Promise.reject(error);
});


const logRequests = !!process.env.DEBUG_API

function fetch (child) {
  logRequests && console.log(`fetching ${child}...`)

  return new Promise((resolve, reject) => {

  });
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map(id => fetchItem(id)))
}

export function auth (login, messenger_id, code) {
  return axios.post(`${apiUrl}/api/auth/`, { login, messenger_id, code }).then(response => {
    return response.data.token
  })
}

export function oauth (provider, oauthService) {
  return oauthService.authenticate(provider);
}

export function fetchToken (type) {
  return localStorage['token']
    ? Promise.resolve(localStorage['token'])
    : Promise.reject()
}

export function fetchMe (token) {
  token = token || localStorage['token'];
  if (token == null) return Promise.reject();
  return axios.get(`${apiUrl}/api/me/`, { headers: { 'Authorization': 'Bearer ' + token } }).then(response => {
    return response.data.data
  })
}

export function fetchUser (id) {
  return axios.get(`${apiUrl}/api/users/${id}`).then(response => {
    return response.data.data
  });
}

export function fetchUsers () {
  return axios.get(`${apiUrl}/api/users/`).then(response => {
    return response.data.data
  });
}

export function search (searchQuery) {
  return axios.get(`${apiUrl}/api/search`, { params: { q: searchQuery } }).then(response => {
    return response.data.data
  });
}

export function updateMe (token, data) {
  return axios.put(`${apiUrl}/api/me/`, { ...data }, { headers: { 'Authorization': 'Bearer ' + token } })
}