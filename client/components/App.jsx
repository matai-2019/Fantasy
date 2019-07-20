import React from 'react'
import AdminLayout from './AdminLayout'
import LoginLayout from './LoginLayout'
import { ChatTemplate, ButtonExamplePositive } from './ChatLayout'
import { BrowserRouter as Router } from 'react-router-dom'
import { getAllUsers, getAllMessages, addUser, addMessage } from '../../server/db/fsdb'
import io from 'socket.io-client'

const socket = io()

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

  addUser('TestBed', 'NewNameTest')
    .then(array => console.log(array))

  addMessage('TestBed', 'Celia', [1, 3], 'NICE')
    .then(array => console.log(array))

  return (
    <>
      <h1>Welcome to Fantasy!!!</h1>
      <LoginLayout />
      {/* <AdminLayout /> */}
      {/* <ChatTemplate /> */}
      {/* <ButtonExamplePositive /> */}
    </>
  )
}

export default App
