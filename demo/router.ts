
import Vue from 'vue'
import VueRouter from 'vue-router'
import page1 from './route1.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/page1',
    name: 'Page1',
    component: page1
  }
]

const router = new VueRouter({
  routes
})

export default router
