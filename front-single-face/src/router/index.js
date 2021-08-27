import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Detail from '../views/Detail.vue'
import Users from '../views/Users.vue'
import FanPage from '../views/FanPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    
  },

  {
    path: '/auth',
    name: 'auth',
    component: Login,
  },

  {
    path: '/detail-post/:id',
    name: 'detail',
    component: Detail,
    
  },

  {
    path: '/users',
    name: 'users',
    component: Users,
    
  },

  {
    path: '/fanpage/:id',
    name: 'fanpage',
    component: FanPage,
    
  },


]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router