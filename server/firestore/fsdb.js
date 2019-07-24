import firebase from 'firebase/app'
import 'firebase/firestore'
import { arrayExpression } from '@babel/types'
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
let db = fire.firestore()

const getAllUsers = (sessionId) => {
  return db.collection(sessionId).doc('Users').get()
    .then(data => {
      return data.data()
    })
}

const getNewID = (ssID) => {
  let id
  return getAllUsers(ssID)
    .then(obj => {
      if (obj === undefined) return 1
      if (obj.users.length > 0) {
        const sorted = obj.users.map(user => user.id)
        id = sorted.sort((a, b) => a > b)[sorted.length - 1] + 1
      } else id = 1
      return id
    })
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
      console.log(obj)
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

const removeUser = (sessionId, Userid) => {
  return db.collection(sessionId).doc('Users').get()
    .then(obj => {
      obj = obj.data()
      const removed = obj.users.filter(user => user.id === Userid)[0]
      let index = obj.users.indexOf(removed)
      index = index === -1 ? null : obj.users.splice(index, 1)
      return obj
    })
    .then((obj) => {
      return db.collection(sessionId).doc('Users').set(obj)
        .then(() => {
          return obj
        })
    })
}

const getAllMessages = (sessionId) => {
  return db.collection(sessionId).doc('Messages').get()
    .then(data => { return data.data() })
}

const getViewableMessages = (sessionId, userId) => {
  const newArr = []
  return db.collection(sessionId).doc('Messages').get()
    .then(data => {
      const obj = data.data()
      if (obj.messages) {
        obj.messages.forEach(message => {
          if (message.recipients.includes(userId)) newArr.push(message)
        })
      }
      return newArr
    })
}

const addMessage = (sessionId, userName, recipients, messageText) => {
  return getAllMessages(sessionId)
    .then(obj => {
      const id = obj.messages[obj.messages.length - 1].id + 1
      let timestamp = new Date()
      timestamp = timestamp.getTime()
      const message = { id, userName, messageText, recipients, timestamp }
      obj.messages.push(message)
      return obj
    })
    .then(obj => {
      return db.collection(sessionId).doc('Messages').set(obj)
        .then(() => {
          return obj.messages
        })
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

const replaceDB = (newDB) => {
  db = newDB
}

export {
  db,
  replaceDB,
  addUser,
  removeUser,
  getAllUsers,
  getNewID,
  addMessage,
  getAllMessages,
  getViewableMessages,
  resetFirestore
}
