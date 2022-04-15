import superagent from 'superagent'

let myId = null
let authHeader = null
let userName = null

const url = process.env.VUE_APP_BACKEND_URL

const maximalNameLength = 16
const validCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZäöußÄÖÜẞΑαΒβΓγΔδΕεΖζΗηΘθΙιΚκΛλΜμΝνΞξΟοΠπΡρΣσςΤτΥυΦφΧχΨψΩω";

function signUp(name, password) {
  const user = {
    id: null,
    version: null,
    name: name,
    password: password,
  }
  return superagent
    .post(url + 'user/add', user)
}

function getAll() {
  superagent
    .get(url + 'user/get-all')
    .then(result => alert(JSON.stringify(result)))
}

function getUser(id) {
  return superagent
    .get(url + 'user/get/' + id)
    .set('Authorization', authHeader)
}

function getUserSelf() {
  return superagent
    .get(url + 'user/get/' + myId)
    .set('Authorization', authHeader)
}

function logIn(name, password) {
  return superagent
    .get(url + 'user/get-by-name/' + name)
    .then(result => {
        myId = result.text
        authHeader = "Basic " + btoa(myId + ":" + password)
      return superagent
        .get(url + 'user/get/' + result.text)
        .set('Authorization', authHeader)
    })
    .then(result => {
      userName = result.body.name
      return userName
    })
}

function logOut() {
  myId = null
  authHeader = null
  userName = null
}

export default {
  signUp,
  getAll,
  getUser,
  getUserSelf,
  logIn,
  logOut,
  userName,
  maximalNameLength,
  validCharacters,
}
