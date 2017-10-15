import axios from 'axios';
import mockData from './mockData';

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
  return fetch(`user/${id}`)
}

export function fetchUsers () {
  return axios.get(`https://randomuser.me/api/?results=100`).then(response => {

      function capitalizeFirstLetter(string) {
          return string.charAt(0).toUpperCase() + string.slice(1);
      }

    return response.data.results.map((e, i) => {
        e.id = i;
        e.name = capitalizeFirstLetter(e.name.first) + " " +  capitalizeFirstLetter(e.name.last);
        return e;
    });
  })// fetch(`experts`)
}
