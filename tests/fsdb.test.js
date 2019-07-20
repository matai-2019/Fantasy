import React, { Component } from 'react'

const db = require('../server/firestore/fsdb')

test('getAllUsers returns '

)
const App = () => {
  let Users = []
  getAllUsers('TestBed')
    .then(data => {
      Users = data
      console.log(Users)
    })

  let messages = []
  getAllMessages('TestBed')
    .then(info => {
      messages = info
      console.log({ messages })
    })

  addUser('TestBed', 'Wizard')
    .then(array => console.log(array))

  addMessage('TestBed', 'Celia', [1, 3], 'Wizard is the best')
    .then(array => console.log(array))

  resetFirestore('TestBed2')

  return (
    <>
      <h1>Welcome to Fantasy!!!</h1>
      <LoginLayout />
      {/* <AdminLayout /> */}
      {/* {/* <ChatTemplate /> */}
      {/* <ButtonExamplePositive /> */}
    </>
  )
}
