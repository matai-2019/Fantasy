import React, { Component } from 'react'
import AdminLayout from './AdminLayout'
import LoginLayout from './LoginLayout'
import { ChatTemplate, ButtonExamplePositive } from './ChatLayout'
import { getAllUsers, getAllMessages, addUser, addMessage, getNewID, resetFirestore } from '../../server/firestore/fsdb'
import io from 'socket.io-client'

// client consts
const socket = io()
const ssID = window.location.pathname.slice(1)

// client-only functions
const saveSession = state => {
  const { id, isAdmin, userName } = state.user
  sessionStorage.setItem('id', id)
  sessionStorage.setItem('isAdmin', isAdmin)
  sessionStorage.setItem('userName', userName)
  sessionId = id
  sessionAdmin = isAdmin
  sessionName = userName
}
const loadSession = () => {
  sessionId = sessionStorage.getItem('id')
  sessionAdmin = sessionStorage.getItem('isAdmin')
  sessionName = sessionStorage.getItem('userName')
}
const saveMessages = () => {
  getAllMessages(ssID)
    .then(obj => {
      messages = obj.messages
    })
}
const saveUsers = () => {
  getAllUsers(ssID)
    .then(obj => {
      userArray = obj.users
    })
}

// socket events
socket.on('get-state', () => {
  socket.emit('set-state', { id: sessionId, isAdmin: sessionAdmin, userName: sessionName })
})
socket.on('new-message', () => {
  saveMessages()
})
socket.on('new-user', () => {
  saveUsers()
})

// Variables for client + App class interaction
let sessionId, sessionAdmin, sessionName
let messages = []
let userArray = []
loadSession()
saveMessages()
saveUsers()
console.log('SESSIONID', ssID)

class App extends Component {
  state = {
    user: { id: sessionId, isAdmin: sessionAdmin, userName: sessionName }
  }

  setUserName = username => {
    addUser(ssID, username)
      .then(user => {
        this.setState({ user }, () => {
          saveSession(this.state)
        })
        socket.emit('new-user')
      })
  }

  render () {
    return (
      <>
        <h1>Welcome to Fantasy!!!</h1>
        { console.log('RENDER STATE', this.state)}
        {(this.state.user.id)
          ? <>
            <ChatTemplate messageArray={messages} userArray={userArray}/>
            <ButtonExamplePositive />
          </>
          : <LoginLayout setUserName={this.setUserName}/>}
      </>
    )
  }
}

export default App
