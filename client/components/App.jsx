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

  addMessage({ id: 11, authorId: 4, messsage: 'newTest message', recipients: [1, 2], timestamp: 123456789 })
    .then(data => {
      console.log({ data })
    })

  return (
    <>
      <h1>Welcome to Fantasy!!!</h1>
      {/* <LoginLayout /> */}
      <AdminLayout />
      {/* <ChatTemplate />
      <ButtonExamplePositive /> */}
    </>
  )
}

export default App
