import React, { Component } from 'react'
import LoginLayout from './LoginLayout'
import { ChatTemplate } from './ChatLayout'
import { getAllUsers, getAllMessages, addUser, removeUser, addMessage, getNewID, resetFirestore } from '../../server/firestore/fsdb'
import io from 'socket.io-client'
import ReactDOM from '../index'

// client consts
const socket = io()
const ssID = window.location.pathname.slice(1)

// client-only functions
const saveSession = userObj => {
  const { id, isAdmin, userName } = userObj
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
  return getAllMessages(ssID)
    .then(obj => {
      messageArray = obj.messages
      return obj
    })
}
const saveUsers = () => {
  return getAllUsers(ssID)
    .then(obj => {
      userArray = obj.users
    })
}

// socket events
socket.on('load-user', () => {
  socket.emit('set-state', { id: sessionId, isAdmin: sessionAdmin, userName: sessionName })
})

socket.on('pull-messages', () => {
  console.log('received pull-messages')
  saveMessages()
    .then(() => {
      ReactDOM.render(<App />, document.getElementById('app'))
    })
})
socket.on('pull-users', () => {
  console.log('received pull-users')
  saveUsers()
    .then(() => {
      ReactDOM.render(<App />, document.getElementById('app'))
    })
})
socket.on('disconnect', () => {
})

// Variables for client + App class interaction
let sessionId, sessionAdmin, sessionName
let messageArray = []
let userArray = []

// onLoad functions
loadSession()
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
        saveUsers().then(() => {
          saveSession(user)
          this.setState({ user })
          socket.emit('new-user')
        })
      })
  }

  sendMessage = (message) => {
    getAllUsers(ssID)
      .then(obj => {
        return obj.users.map(user => user.id)
      })
      .then(recipients => {
        addMessage(ssID, sessionName, recipients, message)
          .then(obj => {
            console.log('emit new-msg')
            socket.emit('new-message')
          })
      })
  }

  render() {
    return (
      <>
      <br/>
      <h1 align="center">Welcome to Fantasy!!!</h1>
         {(this.state.user.id)
           ? <ChatTemplate socket={socket} messageArray={messageArray} userArray={userArray} sendMessage={this.sendMessage}/>
           : <LoginLayout setUserName={this.setUserName}/>}
      </>
    )
  }
}

export default App
