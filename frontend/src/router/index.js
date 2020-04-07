import Vue from 'vue'
import Router from 'vue-router'

import UsersWorld from '@/components/UsersWorld'
import sandbox from '@/components/sandbox'
import tasks from '@/components/tasks'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: UsersWorld
    },
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: sandbox
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: tasks
    },
  ]
})