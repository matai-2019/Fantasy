import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { getAllUsers, getAllMessages, addUser, addMessage } from '../../server/db/fsdb'

const App = () => {
  let users = []
  getAllUsers('TestBed')
    .then(data => {
      users = data
      console.log(users)
    })

  let messages = []
  getAllMessages('TestBed')
    .then(info => {
      messages = info
      console.log({ messages })
    })

  addUser({ id: 5, isAdmin: false, name: 'tamari' })
    .then(data => {
      user = data
      console.log({ user })
    })

  addMessage({ id: 11, authorId: 4, messsage: 'Test Message', recipients: [1, 2], timestamp: 123456789 })
    .then(message => {
      messages = message
      console.log({ message })
    })
  // addUser({ id: 4, isAdmin: false, name: 'tamari' })

  return (
    <Router>
      <>
        <h1>Welcome to Fantasy!!!</h1>
        {users}
      </>
    </Router>
  )
}

export default App
