import firebase from 'firebase/app'
import 'firebase/firestore'
const firebaseConfig = {
  apiKey: 'AIzaSyAGK7lTDySjyb-huj2kUzjSoz_pSsLmafM',
  authDomain: 'fantasy-scroll.firebaseapp.com',
  databaseURL: 'https://fantasy-scroll.firebaseio.com',
  projectId: 'fantasy-scroll',
  storageBucket: 'fantasy-scroll.appspot.com',
  messagingSenderId: '325113898596',
  appId: '1:325113898596:web:c745fc7aa34f979b'
}
const fire = firebase.initializeApp(firebaseConfig)
const db = fire.firestore()

const getNewID = () => {
  let id
  return getAllUsers('TestBed')
    .then(obj => {
      let sorted = obj.users.map(user => user.id)
      id = sorted.sort((a, b) => a < b)[sorted.length - 1] + 1
      return id
    })
}

const getAllUsers = (sessionId) => {
  return db.collection(sessionId).doc('Users').get()
    .then(data => { return data.data() })
}

const addUser = (sessionId, userName) => {
  let user
  return getAllUsers(sessionId)
    .then(obj => {
      return getNewID().then(id => {
        let isAdmin = true
        obj.users.forEach(user => {
          if (user.isAdmin === true) isAdmin = false
        })
        user = { id, isAdmin, userName }
        obj.users.push(user)
        db.collection(sessionId).doc('Users').set(obj)
        console.log('addUser', user)
        return user
      })
    })
}

const getAllMessages = (sessionId) => {
  return db.collection(sessionId).doc('Messages').get()
    .then(data => { return data.data() })
}

const addMessage = (sessionId, userName, recipients, messageText) => {
  return getAllMessages(sessionId)
    .then(obj => {
      let id = obj.messages[obj.messages.length - 1].id + 1
      let date = new Date()
      let timestamp = date.getTime()
      let message = { id, userName, messageText, recipients, timestamp }
      obj.messages.push(message)
      db.collection(sessionId).doc('Messages').set(obj)
      return obj.messages
    })
}
const resetFirestore = (sessionId) => {
  db.collection(sessionId).doc().delete().then(function () {
    console.log('Document successfully deleted!')
  }).catch(function (error) {
    console.error('Error removing document: ', error)
  })
}

export {
  getAllUsers,
  getAllMessages,
  addUser,
  addMessage,
  resetFirestore,
  getNewID
}
