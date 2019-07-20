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

const getAllUsers = (sessionId) => {
  const arr = []
  const db = fire.firestore()
  db.collection(sessionId).get()
    .then(sshot => {
      sshot.forEach(doc => {
        if (doc.data().users) arr.push(doc.data().users)
      })
    })
    .then(() => {
      console.log('USERS:', arr[0])
      return arr[0]
    })
}

const getAllMessages = (sessionId) => {
  const arr = []
  const db = fire.firestore()
  db.collection(sessionId).get()
    .then(sshot => {
      sshot.forEach(doc => {
        if (doc.data().messages) arr.push(doc.data().messages)
      })
    })
    .then(() => {
      console.log('MESSAGES:', arr[0])
      return arr[0]
    })
}

export {
  getAllUsers,
  getAllMessages
}
