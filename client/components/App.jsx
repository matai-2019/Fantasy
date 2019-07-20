import React from 'react'
import AdminLayout from './AdminLayout'
import LoginLayout from './LoginLayout'
import { ChatTemplate, ButtonExamplePositive } from './ChatLayout'
import io from 'socket.io-client'

const socket = io()

const App = () => {
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
