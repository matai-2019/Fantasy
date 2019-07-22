import React, { Component } from 'react'
import AdminLayout from './AdminLayout'
import LoginLayout from './LoginLayout'
import { ChatTemplate, ButtonExamplePositive } from './ChatLayout'
import { getAllUsers, getAllMessages, addUser, removeUser, addMessage, getNewID, resetFirestore } from '../../server/firestore/fsdb'
import io from 'socket.io-client'

// client consts
const socket = io()
const ssID = window.location.pathname.slice(1)
console.log(window.location.pathname)

// client-only functions
const saveSession = state => {
  const { id, isAdmin, userName } = state.user
  sessionStorage.setItem('id', id)
  sessionStorage.setItem('isAdmin', isAdmin)
  sessionStorage.setItem('userName', userName)
  sessionStorage.setItem('users', JSON.stringify(userArray))
  sessionStorage.setItem('messages', JSON.stringify(messageArray))
  sessionId = id
  sessionAdmin = isAdmin
  sessionName = userName
}
const loadSession = () => {
  sessionId = sessionStorage.getItem('id')
  sessionAdmin = sessionStorage.getItem('isAdmin')
  sessionName = sessionStorage.getItem('userName')
  userArray = JSON.parse(sessionStorage.getItem('users'))
  messageArray = JSON.parse(sessionStorage.getItem('messages'))
}
const saveMessages = () => {
  getAllMessages(ssID)
    .then(obj => {
      messageArray = obj.messages
    })
}
const saveUsers = () => {
  return getAllUsers(ssID)
    .then(obj => {
      userArray = obj.users
      console.log('saveUsers', userArray)
    })
}

// socket events
socket.on('get-state', () => {
  socket.emit('set-state', { id: sessionId, isAdmin: sessionAdmin, userName: sessionName })
})
socket.on('new-message', () => {
  saveMessages()
})
socket.on('pull-users', () => {
  saveUsers()
})
socket.on('testing', () => {
  console.log('TESTING SUCCESSFUL, YEET')
})
socket.on('disconnect', () => {
  console.log('DC')
})

// Variables for client + App class interaction
let sessionId, sessionAdmin, sessionName
let messageArray = []
let userArray = []

// onLoad functions
loadSession()
socket.emit('user-loaded', sessionId)
console.log('Session Obj', sessionName)
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
        socket.emit('new-user')
        return user
      })
      .then(user => {
        saveUsers().then(() => {
          this.setState({ user }, () => {
            saveSession(this.state)
          })
        }
        )
      })
  }

  render () {
    return (
      <>
        <h1 align="center">Welcome to Fantasy!!!</h1>
        {/* <LoginLayout setUserName={this.setUserName}/> */}
        { console.log('RENDER STATE', this.state)}
        {(this.state.user.id)
          ? <ChatTemplate socket={socket} messageArray={messageArray} userArray={userArray} renderProp={true}/>
          : <LoginLayout setUserName={this.setUserName}/>}
        {/* <ChatTemplate />
        <ButtonExamplePositive /> */}

      </>
    )
  }
}

export default App
