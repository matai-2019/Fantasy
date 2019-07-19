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

  addUser({ id: 6, isAdmin: false, name: 'Joe Bloggs' })
    .then(data => {
      console.log({ data })
    })

  addMessage({ id: 11, authorId: 4, messsage: 'newTest message', recipients: [1, 2], timestamp: 123456789 })
    .then(data => {
      console.log({ data })
    })

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
