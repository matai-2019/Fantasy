import React, { Component } from 'react'
import AdminLayout from './AdminLayout'
import LoginLayout from './LoginLayout'
import { ChatTemplate, ButtonExamplePositive } from './ChatLayout'
import { BrowserRouter as Router } from 'react-router-dom'
import { getAllUsers, getAllMessages, addUser, addMessage, resetFirestore } from '../../server/firestore/fsdb'

import io from 'socket.io-client'

const socket = io()

let sessionId = sessionStorage.getItem('id')
let sessionAdmin = sessionStorage.getItem('isAdmin')
let sessionName = sessionStorage.getItem('userName')

socket.on('get-state', () => {
  socket.emit('set-state', { id: sessionId, isAdmin: sessionAdmin, userName: sessionName })
})

getAllUsers('TestBed')

getAllMessages('TestBed')

resetFirestore('TestBed2')

class App extends Component {
  state = {
    user: { id: sessionId, isAdmin: sessionAdmin, userName: sessionName }
  }

  setUserName = username => {

  }

  users = []
  messages = []
  render () {
    return (
      <>
        <h1>Welcome to Fantasy!!!</h1>
        <LoginLayout setUserName={this.setUserName}/>
        {/* <ChatTemplate />
        <ButtonExamplePositive /> */}
      </>
    )
  }
}

export default App
