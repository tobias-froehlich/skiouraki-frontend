import HomeComponent from './components/HomeComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import SignupComponent from './components/SignupComponent.vue'
import ChangeUserName from './components/ChangeUserName.vue'
import ChangePassword from './components/ChangePassword.vue'
import DeleteUser from './components/DeleteUser.vue'
import OverviewComponent from './components/OverviewComponent.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {path: '/', component: HomeComponent},
  {path: '/login', component: LoginComponent},
  {path: '/signup', component: SignupComponent},
  {path: '/change-user-name', component: ChangeUserName},
  {path: '/change-password', component: ChangePassword},
  {path: '/delete-user', component: DeleteUser},
  {path: '/overview', component: OverviewComponent},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export {
  routes,
  router,
}

