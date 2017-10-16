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
  return axios.get(`https://randomuser.me/api/?results=100`).then(response => {
    return response.data.results.map((e, i) => {
        e.id = i;
        e.name = capitalizeFirstLetter(e.name.first) + " " +  capitalizeFirstLetter(e.name.last);
        e.url = '/id' + i;
        return e;
    });
  })// fetch(`experts`)
}
