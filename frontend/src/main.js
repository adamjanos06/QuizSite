import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { router } from '@/router/index.js'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import { plugin, defaultConfig } from '@formkit/vue'

// Change this line:
import IndexPage from '@/pages/index.vue' // <-- import your index.vue

import '@assets/main.css'

createApp(IndexPage) // <-- use IndexPage instead of App
  .use(createPinia().use(piniaPluginPersistedstate))
  .use(router)
  .use(plugin, defaultConfig)
  .mount('#app')