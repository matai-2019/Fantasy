import React, { Component } from 'react'
import LoginLayout from './LoginLayout'
import { ChatTemplate } from './ChatLayout'
import { getAllUsers, getAllMessages, addUser, removeUser, addMessage, getNewID, getViewableMessages, resetFirestore } from '../../server/firestore/fsdb'
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
  userArray = (sessionStorage.getItem('users') === null) ? [] : JSON.parse(sessionStorage.getItem('users'))
  messageArray = (sessionStorage.getItem('messages') === null) ? [] : JSON.parse(sessionStorage.getItem('messages'))
}
const saveMessages = () => {
  loadSession()
  return getViewableMessages(ssID, Number(sessionId))
    .then(obj => {
      if (obj) messageArray = obj
      return obj
    })
}
const saveUsers = () => {
  loadSession()
  return getAllUsers(ssID)
    .then(obj => {
      userArray = obj.users
    })
}
const renderDOM = () => {
  ReactDOM.render(<App />, document.getElementById('app'))
}

// socket events
socket.on('load-user', () => {
  socket.emit('set-state', { id: sessionId, isAdmin: sessionAdmin, userName: sessionName })
})
socket.on('pull-messages', () => {
  saveMessages()
    .then(() => {
      renderDOM()
    })
})
socket.on('pull-users', () => {
  saveUsers()
    .then(() => {
      renderDOM()
    })
})
socket.on('disconnect', () => {
})

// Variables for client + App class interaction
let sessionId, sessionAdmin, sessionName
let userArray = []
let messageArray = []

// onLoad functions
saveUsers()
saveMessages()
loadSession()
console.log('Session Obj', sessionName)

class App extends Component {
  state = {
    user: { id: sessionId, isAdmin: sessionAdmin, userName: sessionName }
  }

  setUserName = username => {
    addUser(ssID, username)
      .then(user => {
        saveUsers()
          .then(() => {
            saveSession(user)
            this.setState({ user }, () => socket.emit('new-user'))
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
            socket.emit('new-message')
          })
      })
  }

  render () {
    return (
      <>
        <div style={{ backgroundImage: './img/wp-1.jpg' }}>
          <br/>
          <h1 style={{ color: 'white' }} align="center">Welcome {sessionName}!</h1>
          {(this.state.user.id)
            ? <ChatTemplate socket={socket} messageArray={messageArray} userArray={userArray} sendMessage={this.sendMessage}/>
            : <LoginLayout setUserName={this.setUserName} userArray={userArray}/>}
        </div>
      </>
    )
  }
}

export default App
