import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '@/views/HomePage.vue';
import ProductView from '@/views/ProductView.vue';
import LoginPanel from '@/views/LoginPanel.vue';
import UserProfile from '@/views/user/UserProfile.vue';
import UserProducts from '@/views/user/UserProducts.vue';
import UserPurchases from '@/views/user/UserPurchases.vue';
import UserSales from '@/views/user/UserSales.vue';
import UserEdit from '@/views/user/UserEdit.vue';

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
    path: '/produto/:id',
    name: 'product',
    component: ProductView,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: LoginPanel
  },
  {
    path: '/usuario',
    component: UserProfile,
    meta:{
      login: true
    },
    children:[
      {
        path: "",
        name: "user",
        component: UserProducts
      },
      {
        path: "purchases",
        name: "purchases",
        component: UserPurchases
      },
      {
        path: "sales",
        name: "sales",
        component: UserSales
      },
      {
        path: "user-edit",
        name: "user-edit",
        component: UserEdit
      }
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(){
    return window.scrollTo({ top: 0, behavior: "smooth" })
  }
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.login)){
    if(!window.localStorage.token){
      next("/login")
    }else{
      next();
    }
  }else{
    next();
  }
})

export default router