import userApi from './userApi.js'
import superagent from 'superagent'

const url = process.env.VUE_APP_BACKEND_URL

const minimalNameLength = 1
const maximalNameLength = 32

function getShoppingLists() {
  return superagent
    .get(url + 'shopping-list/get')
    .set('Authorization', userApi.getAuthHeader())
    .then(result => result.body)
}

function getShoppingList(shoppingListId) {
  return superagent
    .get(url + 'shopping-list/get/' + shoppingListId)
    .set('Authorization', userApi.getAuthHeader())
    .then(result => result.body)
}

function addShoppingList(name) {
  return superagent
    .post(url + 'shopping-list/add', {id: null, version: null, name: name, owner: null})
    .set('Authorization', userApi.getAuthHeader())
}

function deleteShoppingList(shoppingListId) {
  return superagent
    .delete(url + 'shopping-list/delete/' + shoppingListId)
    .set('Authorization', userApi.getAuthHeader())
}

function inviteUser(shoppingListId, userId) {
  return superagent
    .post(url + 'shopping-list/invite/' + shoppingListId + "/" + userId)
    .set('Authorization', userApi.getAuthHeader())
    .then(result => result.body)
}

export default {
  getShoppingLists,
  getShoppingList,
  addShoppingList,
  deleteShoppingList,
  inviteUser,
  minimalNameLength,
  maximalNameLength,
}