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
let db = fire.firestore()

const getAllUsers = (sessionId) => {
  return db.collection(sessionId).doc('Users').get()
    .then(data => {
      return data.data()
    })
}

const getNewID = (obj) => {
  let id
  const validIDs = []
  if (obj === undefined) return 1
  if (obj.users.length > 0) {
    obj.users.forEach(user => {
      if (typeof user.id === typeof 0) validIDs.push(user.id)
    })
    id = validIDs.sort((a, b) => a > b)[validIDs.length - 1] + 1
  } else id = 1
  return id
}

const addUser = (sessionId, userName, isAdmin) => {
  let id
  return getAllUsers(sessionId)
    .then(obj => {
      if (obj.users.length > 0) {
        id = getNewID(obj)
      } else {
        id = 1
      }
      return obj
    })
    .then(obj => {
      console.log(obj, id, userName, sessionId, isAdmin)
      return sendUser(obj, id, userName, sessionId, isAdmin)
    })
}

const sendUser = (obj, id, userName, sessionId, isAdmin) => {
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
      let id
      const validIDs = []
      obj.messages.forEach(msg => {
        if (typeof msg.id === typeof 0 && !isNaN(msg.id)) validIDs.push(msg.id)
      })
      if (validIDs.length > 0) {
        console.log(validIDs)
        console.log(validIDs.sort((a, b) => a > b))
        id = validIDs.sort((a, b) => a > b)[validIDs.length - 1] + 1
        console.log(id)
      } else id = 1
      let timestamp = new Date()
      timestamp = timestamp.getTime()
      const message = { id, userName, messageText, recipients, timestamp }
      obj.messages.push(message)
      console.log(obj)
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
      return db.collection(sessionId).doc('Messages').delete()
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
  addMessage,
  getAllMessages,
  getViewableMessages,
  resetFirestore
}
