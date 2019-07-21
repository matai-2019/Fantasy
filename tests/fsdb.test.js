import { exportAllDeclaration } from '@babel/types'

import {
  getAllUsers,
  getAllMessages,
  addUser,
  addMessage,
  resetFirestore
} from '../server/firestore/fsdb'

test('getAllUsers returns an array of 4 users', (done) => {
  expect.assertions(1)
  getAllUsers('TestBed2')
    .then(obj => {
      expect(obj.users).toHaveLength(4)
      done()
    })
})

test.skip('addUser adds a new user to db with a sequential userId and if Admin already exists sets it to false', (sessionID, done) => {
  addUser('TestBed2', 'Wizard')
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
//   resetFirestore('TestBed3')

test('getAllMessages returns an array of 3 messages', (done) => {
  expect.assertions(1)
  getAllMessages('TestBed2')
    .then(obj => {
      expect(obj.messages).toHaveLength(4)
      done()
    })
})

test('addMessage adds a new message to db', (done) => {
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

// addUser('TestBed', 'Wizard')
//   .then(array => console.log(array))

// test.skip(resetFirestore('TestBed2'))
