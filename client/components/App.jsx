import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { getAllUsers, getAllMessages, addUser, addMessage } from '../../server/db/fsdb'
import io from 'socket.io-client'

const socket = io()

const App = () => {
  let users = []
  getAllUsers('TestBed')
    .then(data => {
      users = data
    })

  getAllMessages('TestBed')
    .then(data => {
      messages = data
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
