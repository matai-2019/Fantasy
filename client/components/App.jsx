import React from 'react'
import AdminLayout from './AdminLayout'
import LoginLayout from './LoginLayout'
import { ChatTemplate, ButtonExamplePositive, Input } from './ChatLayout'

const App = () => {
  return (
    <>
      <h1>Welcome to Fantasy!!!</h1>
      {/* <LoginLayout /> */}
      <AdminLayout />
      <ChatTemplate />
      <ButtonExamplePositive />
   </>
  )
}

export default App
