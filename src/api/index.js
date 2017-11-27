import axios from 'axios';
import mockData from './mockData';
import { capitalizeFirstLetter } from './mockFunc';

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

export function auth (login, messenger_id) {
  return axios.post(`http://0.0.0.0:7000/api/auth/`, { login, messenger_id }).then(response => {
    return response.data.token
  })
}

export function fetchToken (type) {
  return localStorage['token']
    ? Promise.resolve(localStorage['token'])
    : Promise.reject()
}

export function fetchMe (token) {
  token = token || localStorage['token'];
  if (token == null) return Promise.reject();
  return axios.get(`http://0.0.0.0:7000/api/me/`, { headers: { 'Authorization': 'Bearer ' + token } }).then(response => {
    return response.data.data
  })
}

export function fetchUser (id) {
  return axios.get(`https://randomuser.me/api/`).then(response => {
    return response.data.results.map((e, i) => {
      e.id = 1;
      e.name = capitalizeFirstLetter(e.name.first) + " " +  capitalizeFirstLetter(e.name.last);
      e.url = '/id' + i;
      return e;
    })[0];
  })
}

export function fetchUsers () {
  return axios.get(`http://0.0.0.0:7000/api/users/`).then(response => {
    return response.data.data
  });
}

export function updateMe (token, data) {
  return axios.put(`http://0.0.0.0:7000/api/me/`, { ...data }, { headers: { 'Authorization': 'Bearer ' + token } }).then(response => {
    return response
  })
}