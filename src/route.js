import HomeComponent from './components/HomeComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import SignupComponent from './components/SignupComponent.vue'
import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [
  {path: '/', component: HomeComponent},
  {path: '/login', component: LoginComponent},
  {path: '/signup', component: SignupComponent},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export {
  routes,
  router,
}

