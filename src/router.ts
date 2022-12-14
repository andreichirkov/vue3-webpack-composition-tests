import {createRouter, createWebHistory} from "vue-router"
import Home from '@/components/Home.vue'
import NewPost from '@/components/NewPost.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/post/new',
      component: NewPost
    }
  ]
})

export default router
