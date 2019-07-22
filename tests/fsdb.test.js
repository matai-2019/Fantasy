// import { exportAllDeclaration } from '@babel/types'
// import firebase from 'firebase/app'
// import 'firebase/firestore'

import {
  addUser,
  removeUser,
  replaceDB,
  getAllUsers,
  getNewID,
  addMessage,
  getAllMessages,
  getViewableMessages,
  resetFirestore
} from '../server/firestore/fsdb'

let { db } = require('../server/firestore/fsdb')

const FirestoreMock = {
  Users: {
    users: [
      { id: 1, isAdmin: true, userName: 'Andre' },
      { id: 2, isAdmin: false, userName: 'Ruslan' },
      { id: 3, isAdmin: false, userName: 'Keith' },
      { id: 4, isAdmin: false, userName: 'Taine' }
    ]
  },
  Messages: {
    messages: [
      { id: 1, userName: 'Andre', message: 'test 1', recipients: [1, 2, 3, 4, 5], timestamp: 123456788 },
      { id: 2, userName: 'Taine', message: 'test 2', recipients: [1, 2, 4, 5], timestamp: 123456789 },
      { id: 3, userName: 'Ruslan', message: 'test 3', recipients: [1, 2, 5], timestamp: 123456999 },
      { id: 4, userName: 'Keith', message: 'test 4', recipients: [5], timestamp: 123459989 }
    ]
  }
}

// // const getAllUsersMock = () => {
// //   const obj = FirestoreMock.Users
// //   return Promise.resolve(obj)
// // }

// const getAllMessagesMock = () => {
//   const obj = FirestoreMock.Messages
//   return Promise.resolve(obj)
// }

// // setup Tests
// const sessionData = { session: 'FirestoreMock' }
// const sessionResult = {
//   session: () => sessionData
// }
// const documentData = { doc: 'Users' }
// const documentResult = {
//   doc: () => documentData
// }
// const get = jest.fn()
// // const set = jest.fn()
// const doc = () => {
//   return { documentResult }
// }
// const firestore = () => {
//   return { sessionResult }
// }

describe('getAllUsers', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })
  const docData = {
    users: [
      { id: 1, isAdmin: true, userName: 'Andre' },
      { id: 2, isAdmin: false, userName: 'Ruslan' },
      { id: 3, isAdmin: false, userName: 'Keith' },
      { id: 4, isAdmin: false, userName: 'Taine' }
    ]
  }
  const docResult = {
    users: () => docData
  }
  // db = jest.fn().mockReturnValue({
  //   collection: jest.fn('test').mockReturnValue({
  //     doc: jest.fn().mockReturnValue({
  //       get: jest.fn(() => Promise.resolve(docResult))
  //     })
  //   })
  // })
  let newDB = jest.fn()
  newDB.prototype.collection = jest
  replaceDB(newDB)
  it('getAllUsers accesses session', (done) => {
    console.log(newDB)
    expect(getAllUsers()).toBe('k')
    done()
  })
})

<<<<<<< HEAD
test.skip('getAllUsers returns an array of 4 users', (done) => {
=======
test('getAllUsers returns an array of 4 users', (done) => {

>>>>>>> d7a78580f8d5e0bf4aa0149dd22d2ff31fcd58a3
  getAllUsers('TestBed2')
    .then(obj => {
      expect(obj.Users).toHaveLength(4)
      done()
    })
})

test.skip('addUser adds a new user to db with a sequential userId and if Admin already exists sets it to false', (sessionID, done) => {
  addUser('TestBedAddUsers', 'Wizard')
    .then(array => console.log(array))
  // .then(user => {
  //   console.log(user)
  //   expect({ user }).toEqual({ user: 'Wizard' })
  //   done()
  // })
  // .then(obj => {
  //   console.log(obj.users)
  //   expect(obj.users).toHaveLength(5)
  //   done()
  // })
})

// setUserName = username => {
//   addUser(ssID, username)
//     .then(user => {
//       this.setState({ user }, () => {
//         saveSession(this.state)
//       })
//     })
// }
// addUser('TestBed', 'Wizard')getAllMessages
//   .then(array => console.log(array))


test.skip('getAllMessages returns an array of 4 messages', (done) => {
  getAllMessages('TestBed2')
    .then(obj => {
      expect(obj.messages).toHaveLength(4)
      done()
    })
})

test.skip('addMessage adds a new message to db', (done) => {
  addMessage('TestBed2', 'Celia', [1, 3], 'Wizard is the best')
    .then(messages => {
      expect(messages[3].messageText).toBe('Wizard is the best')
      expect(messages.length).toBe(5)
      done()
    })
})

test.skip('getViewableMessages gets only messages a player can see', (done) => {
  getViewableMessages('TestBed2', '2')
    .then(userMessages => {
      console.log(userMessages)
      done()
    })
})

test.skip('resetFirestore deletes a document', (done) => {
  resetFirestore('123456789012345')
    .then(() => {
      expect(db.collection('123456789012345').doc('Users')).not(null)
      done()
    })
})
