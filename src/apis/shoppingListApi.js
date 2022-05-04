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
    .post(url + 'shopping-list/invite/' + shoppingListId + '/' + userId)
    .set('Authorization', userApi.getAuthHeader())
    .then(result => result.body)
}

function withdrawInvitation(shoppingListId, userId) {
  return superagent
    .post(url + 'shopping-list/withdraw-invitation/' + shoppingListId + '/' + userId)
    .set('Authorization', userApi.getAuthHeader())
    .then(result => result.body)
}

function getInvitations() {
  return superagent
    .get(url + 'shopping-list/get-invitations')
    .set('Authorization', userApi.getAuthHeader())
    .then(result => result.body)
}

function acceptInvitation(shoppingListId) {
  return superagent
    .post(url + 'shopping-list/accept-invitation/' + shoppingListId)
    .set('Authorization', userApi.getAuthHeader())
}

function rejectInvitation(shoppingListId) {
  return superagent
    .post(url + 'shopping-list/reject-invitation/' + shoppingListId)
    .set('Authorization', userApi.getAuthHeader())
}

function removeUser(shoppingListId, userId) {
  return superagent
    .post(url + 'shopping-list/remove-user-from-shopping-list/' + shoppingListId + '/' + userId)
    .set('Authorization', userApi.getAuthHeader())
}

function leaveShoppingList(shoppingListId) {
  return superagent
    .post(url + 'shopping-list/leave-shopping-list/' + shoppingListId)
    .set('Authorization', userApi.getAuthHeader())
}

function getEnrichedShoppingList(shoppingListId) {
  return superagent
    .get(url + 'shopping-list/get-enriched/' + shoppingListId)
    .set('Authorization', userApi.getAuthHeader())
    .then(result => result.body)
}

export default {
  getShoppingLists,
  getShoppingList,
  addShoppingList,
  deleteShoppingList,
  inviteUser,
  withdrawInvitation,
  getInvitations,
  acceptInvitation,
  rejectInvitation,
  removeUser,
  leaveShoppingList,
  getEnrichedShoppingList,
  minimalNameLength,
  maximalNameLength,
}
