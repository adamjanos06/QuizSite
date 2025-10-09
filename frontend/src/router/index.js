import { createRouter, createWebHistory } from 'vue-router'
import { setTitle } from '@/router/guards/SetTitleGuard.mjs'
import { routes } from 'vue-router/auto-routes'

export const router = createRouter({
  history: createWebHistory(),
  routes:[
    {
      path:"/add-board",
      name:"add-board",
      component:()=>import("@pages/add-board.vue"),
      meta:{
        title:"Új tábla"
      }
    },
    {
      path: '/add-card/:boardId',
      name: 'add-card',
      component: () => import('@/pages/add-card.vue'),
      meta:{
        title:"Új kártya"
      }
    },
    {
      path:"/",
      name:"index",
      component:()=>import("@pages/index.vue"),
      meta:{
        title:"Quiztopia Index"
      }
    },
    {
      path: '/board/:boardId',
      name: 'board',
      component: () => import('@/pages/board.vue'),
      meta:{
        title:"Board index"
      }
    }
  ]
})

router.beforeEach(setTitle)
