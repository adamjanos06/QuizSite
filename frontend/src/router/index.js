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
      path:"/",
      name:"index",
      component:()=>import("@pages/index.vue"),
      meta:{
        title:"Quiztopia Index"
      }
    }
  ]
})

router.beforeEach(setTitle)
