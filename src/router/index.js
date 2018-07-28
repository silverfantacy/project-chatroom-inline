import Vue from 'vue'
import Router from 'vue-router'
import 'bootstrap'
import 'jquery'
import 'popper.js'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/chatroom',
      name: 'ChatRoom',
      component: () => import('@/pages/ChatRoom')
    },
    {
      path: '*',
      redirect: '/chatroom'
    }
  ]
})
