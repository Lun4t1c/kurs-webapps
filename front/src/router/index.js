import { createRouter, createWebHashHistory } from 'vue-router'
import Start from '../views/StartView.vue'
import Ringing from '../views/RingingView.vue'
import Connected from '../views/ConnectedView.vue'
import Answered from '../views/AnsweredView.vue'

const routes = [
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/',
    name: 'start',
    component: Start
  },
  {
    path: '/ringing',
    name: 'ringing',
    component: Ringing,
    props: true
  },
  {
    path: '/connected',
    name: 'connected',
    component: Connected
  },
  {
    path: '/answered',
    name: 'answered',
    component: Answered
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
