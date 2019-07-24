import React, { Component } from 'react'
import LoginLayout from './LoginLayout'
import { ChatTemplate } from './ChatLayout'
import { Dimmer, Loader } from 'semantic-ui-react'
import { getAllUsers,
  getAllMessages,
  addUser,
  removeUser,
  addMessage,
  getViewableMessages,
  resetFirestore
} from '../../server/firestore/fsdb'
import io from 'socket.io-client'
import ReactDOM from '../index'

// client consts
const socket = io()
const ssID = window.location.pathname.slice(1)
const fullPath = window.location.href

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
  const sessObj = {
    id: JSON.parse(sessionStorage.getItem('id')),
    isAdmin: JSON.parse(sessionStorage.getItem('isAdmin')),
    userName: sessionStorage.getItem('userName')
  }
  userArray = JSON.parse(sessionStorage.getItem('users'))
  messageArray = JSON.parse(sessionStorage.getItem('messages'))

  const loggedIn = userArray.filter(user => {
    return (user.id === sessObj.id && user.isAdmin === sessObj.isAdmin && user.userName === sessObj.userName)
  }).length
  sessionId = loggedIn ? sessObj.id : null
  sessionAdmin = loggedIn ? sessObj.isAdmin : null
  sessionName = loggedIn ? sessObj.userName : null
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
          sessionStorage.setItem('users', JSON.stringify(userArray))
          sessionStorage.setItem('messages', JSON.stringify(messageArray))
        })
    })
}

const pullRender = () => {
  return pullFirestore()
    .then(() => {
      return renderApp()
    })
}

const handleKickUser = (userid) => {
  removeUser(ssID, userid)
    .then(() => {
      socket.emit('change-occured')
    })
}

const handleResetFirestore = (sessionid) => {
  resetFirestore(sessionid)
    .then(() => {
      socket.emit('change-occured')
    })
}
const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('app'))
}

// socket events
socket.on('update-sockets', () => {
  pullRender()
})
socket.on('disconnect', () => {
})

// Variables for client + App class interaction
let sessionId, sessionAdmin, sessionName
let userArray = []
let messageArray = []
let loading = true

// onLoad functions
pullRender().then(() => {
  loadSession()
  loading = false
  renderApp()
})

class App extends Component {
  setUserName = (username) => {
    addUser(ssID, username)
      .then(user => {
        saveSession(user)
        socket.emit('set-state', { id: sessionId, isAdmin: sessionAdmin, userName: sessionName })
        socket.emit('change-occured')
      })
  }

  sendMessage = (message, recipients) => {
    getAllUsers(ssID)
      .then(obj => {
        if (typeof recipients === typeof [] && recipients.length > 0) return recipients
        return obj.users.map(user => user.id)
      })
      .then(recipients => {
        addMessage(ssID, sessionName, recipients, message)
          .then(obj => {
            socket.emit('change-occured')
          })
      })
  }

  render () {
    return (
      <>
        <div>
          <br/>
          <h1 style={{ color: 'white' }} align="center"><img src="../img/login-title-min.gif" alt="" height="200px" width="900px"/> 
          <br/>{sessionName}!</h1>
          {(sessionId)
            ? <ChatTemplate
              socket={socket}
              messageArray={messageArray}
              userArray={userArray}
              sendMessage={this.sendMessage}
              fullPath={fullPath}
              handleKickUser={handleKickUser}
              handleResetFirestore={handleResetFirestore}
              sessionAdmin={sessionAdmin}
              renderApp={renderApp}
            />
            : <LoginLayout ssID={ssID} setUserName={this.setUserName} userArray={userArray} />}
        </div>
      </>
    )
  }
}

export default App
