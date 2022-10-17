import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage.vue';
import ProductView from '@/views/ProductView.vue';
import LoginPanel from '@/views/LoginPanel.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    component: HomePage
  },
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
  {
    path: '/produtos/:id',
    name: 'product',
    component: ProductView,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPanel
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(){
    return window.scrollTo({ top: 0, behavior: "smooth" })
  }
})

export default router
