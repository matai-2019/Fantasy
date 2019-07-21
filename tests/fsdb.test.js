import { exportAllDeclaration } from '@babel/types'

import {
  getAllUsers,
  getAllMessages,
  addUser,
  addMessage,
  resetFirestore,
  getNewID
} from '../server/firestore/fsdb'

test.skip('getAllUsers returns an array of 4 users', (done) => {
  expect.assertions(1)
  getAllUsers('TestBed2')
    .then(obj => {
      expect(obj.users).toHaveLength(4)
      done()
    })
})

test.skip('addUser adds a new user to db', (done) => {
  const user = 'Wizard'
  addUser('TestBed2', user)
    // .then(array => {
    //   console.log(array)
    //   expect({ user }).toEqual({ user: 'Wizard' })
    //   done()
    // })
    .then(obj => {
      expect(obj.users).toHaveLength(5)
      done()
    })
})

//   resetFirestore('TestBed3')

test.skip('getAllMessages returns an array of 3 messages', (done) => {
  expect.assertions(1)
  getAllMessages('TestBed2')
    .then(obj => {
      expect(obj.messages).toHaveLength(3)
      done()
    })
})

test.skip('addMessage adds a new message to db', (done) => {
  addMessage('TestBed2', 'Celia', [1, 3], 'Wizard is the best')
    .then(array => {
      console.log(array)
      // expect([array]).toMatch(message)
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
