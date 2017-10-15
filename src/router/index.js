import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// route-level code splitting
const Home = () => import('../views/Home.vue')
const SearchResults = () => import('../views/SearchResults.vue')
const ItemView = () => import('../views/ItemView.vue')
const UserView = () => import('../views/UserView.vue')

export function createRouter () {
  return new Router({
    mode: 'history',
    fallback: false,
    scrollBehavior: () => ({ y: 0 }),
    routes: [
      { path: '/', component: Home },
      { path: '/search', component: SearchResults, props: (route) => ({ query: route.query.q }) },
      { path: '/item/:id(\\d+)', component: ItemView },
      { path: '/user/:id', component: UserView }
    ]
  })
}
