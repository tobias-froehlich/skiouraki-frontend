import superagent from 'superagent'

let myId = null //'fa119019-f506-4117-81fb-908cc20a0473'
let authHeader = null //"Basic " + btoa("fa119019-f506-4117-81fb-908cc20a0473:johns-geheimes-password")
let userName = null

const url = process.env.VUE_APP_BACKEND_URL

function signUp(name, password) {
  const user = {
    id: null,
    version: null,
    name: name,
    password: password,
  }
  superagent
    .post(url + 'user/add', user)
    .then(result => alert(JSON.stringify(result)));
}

function getAll() {
  superagent
    .get(url + 'user/get-all')
//    .get('http://localhost:8090/user/get-all')
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
}
