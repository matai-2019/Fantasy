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
  let users = []
  return db.collection(sessionId).get()
    .then(sshot => {
      sshot.forEach(doc => {
        if (doc.data().users) {
          users = doc.data().users
        }
      })
    })
    .then(() => {
      console.log('All Users', (users))
      return users
    })
}

const getAllMessages = (sessionId) => {
  let msgArr = []
  return db.collection(sessionId).get()
    .then(sshot => {
      sshot.forEach(doc => {
        if (doc.data().messages) {
          msgArr = doc.data().messages
        }
      })
    })
    .then(() => {
      console.log('All Messages', (msgArr))
      return msgArr
    })
}

const addUser = (user) => {
  return db.collection('TestBed')
    .doc('Users')
    .get()
    .then(data => {
      console.log('Current User', data.data())
      return data.data()
    })
    .then(obj => {
      let array = obj.users
      array.push(user)
      return { users: array }
    })
    .then(obj => {
      db.collection('TestBed')
        .doc('Users')
        .set(obj)
      return user
    })
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
