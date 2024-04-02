import './assets/main.css'

import { createApp } from 'vue'
import { createMemoryHistory, createWebHistory, createRouter } from 'vue-router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import Home from './pages/Home.vue'
import Favorites from './pages/Favorites.vue'
// import AboutView from './AboutView.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/favorites', name: 'Favorites', component: Favorites }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
