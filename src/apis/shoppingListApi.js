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

function addShoppingList(name) {
  return superagent
    .post(url + 'shopping-list/add', {id: null, version: null, name: name, owner: null})
    .set('Authorization', userApi.getAuthHeader())
}

export default {
  getShoppingLists,
  addShoppingList,
  minimalNameLength,
  maximalNameLength,
}
