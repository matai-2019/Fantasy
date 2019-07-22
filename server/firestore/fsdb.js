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

const getNewID = (ssID) => {
  let id
  return getAllUsers(ssID)
    .then(obj => {
      console.log('users', obj.users)
      if (obj.users.length > 0) {
        const sorted = obj.users.map(user => user.id)
        console.log('sorted', sorted)
        id = sorted.sort((a, b) => a > b)[sorted.length - 1] + 1
      } else id = 1
      console.log('ID', id)
      return id
    })
}

const getAllUsers = (sessionId) => {
  return db.collection(sessionId).doc('Users').get()
    .then(data => { return data.data() })
}

const addUser = (sessionId, userName) => {
  let id
  return getAllUsers(sessionId)
    .then(obj => {
      return getNewID(sessionId)
        .then(data => {
          id = data
          return obj
        })
    })
    .then(obj => {
      return sendUser(obj, id, userName, sessionId)
    })
}

const sendUser = (obj, id, userName, sessionId) => {
  let isAdmin = true
  obj.users.forEach(user => {
    if (user.isAdmin === true) isAdmin = false
  })
  const user = { id, isAdmin, userName }
  obj.users.push(user)
  db.collection(sessionId).doc('Users').set(obj)
  return user
}

const removeUser = (sessionId, userID) => {
  return db.collection(sessionId).doc('Users').get()
    .then(sshot => {
      const obj = sshot.data()
      db.collection(sessionId).doc('Users').set(obj)
      return obj
    })
}

const getAllMessages = (sessionId) => {
  return db.collection(sessionId).doc('Messages').get()
    .then(data => { return data.data() })
}

const getViewableMessages = (sessionId, userId) => {
  return db.collection(sessionId).doc('Messages').get()
    .then(data => {
      const obj = data.data()
      obj.messages.forEach(message => {
        return (message.recipients.includes(userId))
      })
      return obj
    })
}

const addMessage = (sessionId, userName, recipients, messageText) => {
  return getAllMessages(sessionId)
    .then(obj => {
      const id = obj.messages[obj.messages.length - 1].id + 1
      const timestamp = Math.round(Date.now() / 1000)
      console.log(timestamp)
      const message = { id, userName, messageText, recipients, timestamp }
      obj.messages.push(message)
      db.collection(sessionId).doc('Messages').set(obj)
      return obj.messages
    })
}

const resetFirestore = (sessionId) => {
  return db.collection(sessionId).doc('Users').delete()
    .then(function () {
      console.log('Document successfully deleted!')
    }).catch(function (error) {
      console.error('Error removing document: ', error)
    })
}

export {
  db,
  addUser,
  removeUser,
  getAllUsers,
  getNewID,
  addMessage,
  getAllMessages,
  getViewableMessages,
  resetFirestore
}
