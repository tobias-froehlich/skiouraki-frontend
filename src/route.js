import HomeComponent from './components/HomeComponent.vue'
import LoginComponent from './components/LoginComponent.vue'
import SignupComponent from './components/SignupComponent.vue'
import ChangeUserName from './components/ChangeUserName.vue'
import ChangePassword from './components/ChangePassword.vue'
import DeleteUser from './components/DeleteUser.vue'
import OverviewComponent from './components/OverviewComponent.vue'
import ShoppingListOverview from './components/ShoppingListOverview.vue'
import InvitationOverview from './components/InvitationOverview.vue'
import FormAddShoppingList from './components/FormAddShoppingList.vue'
import ShoppingList from './components/ShoppingList.vue'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {path: '/', component: HomeComponent},
  {path: '/login', component: LoginComponent},
  {path: '/signup', component: SignupComponent},
  {path: '/change-user-name', component: ChangeUserName},
  {path: '/change-password', component: ChangePassword},
  {path: '/delete-user', component: DeleteUser},
  {path: '/overview', component: OverviewComponent},
  {path: '/shopping-list-overview', component: ShoppingListOverview},
  {path: '/invitation-overview', component: InvitationOverview},
  {path: '/form-add-shopping-list', component: FormAddShoppingList},
  {path: '/shopping-list', name: 'ShoppingList', component: ShoppingList, props: true},
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export {
  routes,
  router,
}

