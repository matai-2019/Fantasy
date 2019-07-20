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

const getAllUsers = (sessionId) => {
  return db.collection(sessionId).doc('Users').get()
    .then(data => { return data.data() })
}

const addUser = (sessionId, userName) => {
  let user = {}
  return getAllUsers(sessionId)
    .then(obj => {
      let id = obj.users[obj.users.length - 1].id + 1
      let isAdmin = true
      obj.users.forEach(user => {
        if (user.isAdmin === true) isAdmin = false
      })
      user = { id, isAdmin, userName }
      console.log('User', user)
      return obj
    })
    .then(obj => {
      let array = obj.users
      array.push(user)
      console.log(array)
    })
    // .then(obj => {
    //   db.collection('TestBed')
    //     .doc('Users')
    //     .set(obj)
    //   return user
    // })
}

const getAllMessages = (sessionId) => {
  return db.collection(sessionId).doc('Messages').get()
    .then(data => { data.data() })
}

const addMessage = (message) => {
  return db.collection('TestBed')
    .doc('Messages')
    .get()
    .then(data => {
      return data.data()
    })
    .then(obj => {
      let array = obj.messages
      array.push(message)
      return { messages: array }
    })
    .then(obj => {
      db.collection('TestBed')
        .doc('Messages')
        .set(obj)
      return message
    })
}

export {
  getAllUsers,
  getAllMessages,
  addUser,
  addMessage
}
