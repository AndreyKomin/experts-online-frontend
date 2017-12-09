import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const Home = () => import('../views/Home.vue');
const Profile = () => import('../views/Profile.vue');
const Registration = () => import('../views/Registration.vue');
const Roadmap = () => import('../views/Roadmap.vue');
const Contacts = () => import('../views/Contacts.vue');
const SearchResults = () => import('../views/SearchResults.vue');
const ItemView = () => import('../views/ItemView.vue');
const UserView = () => import('../views/UserView.vue');

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', component: Home },
      { path: '/profile', component: Profile },
      { path: '/registration', component: Registration },
      { path: '/roadmap', component: Roadmap },
      { path: '/contacts', component: Contacts },
      { path: '/experts', component: SearchResults, props: (route) => ({ query: route.query.q }) },
      { path: '/users', component: SearchResults, props: (route) => ({ query: route.query.q }) },
      { path: '/:userID', component: UserView },
    ]
  })
}
