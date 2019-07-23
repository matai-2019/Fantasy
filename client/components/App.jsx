import React, { Component } from 'react'
import LoginLayout from './LoginLayout'
import { ChatTemplate } from './ChatLayout'
import { getAllUsers,
  getAllMessages,
  addUser,
  removeUser,
  addMessage,
  getNewID,
  getViewableMessages,
  resetFirestore
} from '../../server/firestore/fsdb'
import io from 'socket.io-client'
import ReactDOM from '../index'

// client consts
const socket = io()
const ssID = window.location.pathname.slice(1)
const fullPath = window.location

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
const pullFirestore = () => {
  return getViewableMessages(ssID, Number(sessionId))
    .then(array => {
      return getAllUsers(ssID)
        .then(obj => {
          userArray = obj.users
          if (array) {
            messageArray = array
          }
          saveSession({ id: sessionId, isAdmin: sessionAdmin, userName: sessionName })
        })
    })
}
const renderUpdate = () => {
  pullFirestore()
    .then(() => {
      ReactDOM.render(<App />, document.getElementById('app'))
    })
}
const handleKickUser = (userid) => {
  console.log(ssID, userid)
  removeUser(ssID, userid)
    .then(() => {
      socket.emit('change-occured')
    })
}

// socket events
socket.on('update-sockets', () => {
  console.log('updateSockets')
  renderUpdate()
})
socket.on('disconnect', () => {
})

// Variables for client + App class interaction
let sessionId, sessionAdmin, sessionName
let userArray = []
let messageArray = []

// onLoad functions
loadSession()
renderUpdate()
console.log('Session Obj', sessionName)

class App extends Component {
  setUserName = (username) => {
    addUser(ssID, username)
      .then(user => {
        saveSession(user)
        socket.emit('set-state', { id: sessionId, isAdmin: sessionAdmin, userName: sessionName })
        loadSession()
        socket.emit('change-occured')
        console.log('setUserName')
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
            socket.emit('change-occured')
            // console.log('sendMessage')
          })
      })
  }

  render () {
    return (
      <>
        <div style={{ backgroundImage: './img/wp-1.jpg' }}>
          <br/>
          <h1 style={{ color: 'white' }} align="center">Welcome {sessionName}!</h1>
          {(sessionId)
            ? <ChatTemplate
              socket={socket}
              messageArray={messageArray}
              userArray={userArray}
              sendMessage={this.sendMessage}
              fullPath={fullPath}
              handleKickUser={handleKickUser}
            />
            : <LoginLayout ssID={ssID} setUserName={this.setUserName} userArray={userArray}/>}
        </div>
      </>
    )
  }
}

export default App

