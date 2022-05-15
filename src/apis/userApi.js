import superagent from 'superagent'

let myId = null
let myVersion = null
let userName = null
let myPassword = null

let authHeader = null

const url = process.env.VUE_APP_BACKEND_URL

const minimalNameLength = 3
const maximalNameLength = 16
const validCharacters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZäöußÄÖÜẞΑΆαάΒβΓγΔδΕΈεέΖζΗΉηήΘθΙΊιίΚκΛλΜμΝνΞξΟΌοόΠπΡρΣσςΤτΥΎυύΦφΧχΨψΩΏωώ";

const minimalPasswordLength = 4
const maximalPasswordLength = 32

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

function getUserByName(name) {
  return superagent
    .get(url + 'user/get-by-name/' + name)
    .then(result => {
      alert(JSON.stringify(result))
      return result.text
     })
    .then(id => {
      alert(id)
      return superagent
        .get(url + 'user/get/' + id)
        .then(result => result.body)
    })
}

function getUserSelf() {
  return superagent
    .get(url + 'user/get/' + myId)
    .set('Authorization', authHeader)
}

function logIn(name, password) {
  myPassword = password
  return superagent
    .get(url + 'user/get-by-name/' + name)
    .then(result => {
      myId = result.text
      authHeader = "Basic " + btoa(encodeURIComponent(myId + ":" + password).replace(/%([0-9A-F]{2})/g,
              function toSolidBytes(match, p1) {
                  return String.fromCharCode('0x' + p1);
          }));
      return superagent
        .get(url + 'user/authenticate/' + result.text)
        .set('Authorization', authHeader)
    })
    .then(result => {
      userName = result.body.name
      myVersion = result.body.version
      return userName
    })
}

function changeName(newName) {
  const user = {
    id: myId,
    version: myVersion,
    name: newName,
    password: myPassword,
  }
  return superagent
    .post(url + 'user/update/' + myId, user)
    .set('Authorization', authHeader)
    .then(user => {
      myId = user.id
      myVersion = user.version
      userName = user.name
      return userName
    })
}

function changePassword(newPassword) {
  const user = {
    id: myId,
    version: myVersion,
    name: userName,
    password: newPassword,
  }
  return superagent
    .post(url + 'user/update/' + myId, user)
    .set('Authorization', authHeader)
    .then(user => {
      myId = user.id
      myVersion = user.version
      userName = user.name
      myPassword = newPassword
      return userName
    })
}

function logOut() {
  myId = null
  myVersion = null
  userName = null
  myPassword = null
  authHeader = null
}

function deleteUser() {
  return superagent
    .delete(url + 'user/delete/' + myId)
    .set('Authorization', authHeader)
    .then(() => {
      logOut()
    })
}

function getUserName() {
  return userName
}

function getUserId() {
  return myId
}

function getAuthHeader() {
  return authHeader
}

export default {
  signUp,
  getAll,
  getUser,
  getUserByName,
  getUserSelf,
  logIn,
  changeName,
  changePassword,
  logOut,
  deleteUser,
  getUserName,
  getUserId,
  getAuthHeader,
  minimalNameLength,
  maximalNameLength,
  minimalPasswordLength,
  maximalPasswordLength,
  validCharacters,
}
