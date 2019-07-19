import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { getAllUsers, getAllMessages, addUser } from '../../server/db/fsdb'

const App = () => {
  let users = []
  getAllUsers('TestBed')
    .then(data => {
      users = data
      console.log(users)
    })

  let messages = []
  getAllMessages('123456789012345')
    .then(info => {
      messages = info
      console.log({ messages })
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
