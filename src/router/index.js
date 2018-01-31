import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Activate from '@/components/Activate'
import Hello from '@/components/Hello'
import Dashboard from '@/components/auth/Dashboard'
import SubmitTicket from '@/components/auth/SubmitTicket'
import ReplyTicket from '@/components/auth/sections/ReplyTicket'
import ViewTicket from '@/components/auth/sections/ViewTicket'
import Settings from '@/components/auth/Settings'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: { requiresAuth: false },
      component: Home,

    },
    {
      path: '/register',
      name: 'Register',
      meta: { requiresAuth: false },
      component: Register
    },
    {
      path: '/login',
      name: 'Login',
      meta: { requiresAuth: false },
      component: Login
    },
    {
      path: '/activate/:user_activation_code',
      name: 'Activate',
      meta: { requiresAuth: false },
      component: Activate
    },
    {
      path: '/settings',
      name: 'Settings',
      meta: { requiresAuth: true },
      component: Settings

    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      meta: { requiresAuth: true },
      component: Dashboard

    },
    {
      path: '/submit-ticket/:category',
      name: 'SubmitTicket',
      meta: { requiresAuth: true },
      props: true,
      component: SubmitTicket
    },
    {
      path: '/reply/:ticket_id',
      name: 'ReplyTicket',
      meta: { requiresAuth: true },
      props: true,
      component: ReplyTicket
    },
    {
      path: '/view/:ticket_id',
      name: 'ViewTicket',
      meta: { requiresAuth: true },
      props: true,
      component: ViewTicket
    }
  ],
  mode: 'history',
  linkActiveClass: 'active'

})
