import React, { Component } from 'react'
import LoginLayout from './LoginLayout'
import { ChatTemplate } from './ChatLayout'
import { Dimmer, Loader } from 'semantic-ui-react'
import { getAllUsers,
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

  let loggedIn = 0
  if (userArray !== null) {
    loggedIn = userArray.filter(user => {
      return (user.id === sessObj.id && user.isAdmin === sessObj.isAdmin && user.userName === sessObj.userName)
    }).length
  }
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
      console.log('render event')
      return renderApp()
    })
}
const handleKickUser = (userid) => {
  removeUser(ssID, userid)
    .then(() => {
      socket.emit('change-occured')
    })
}

const handleResetFirestore = () => {
  resetFirestore(ssID)
    .then(() => {
      socket.emit('change-occured')
    })
}

const renderApp = () => {
  ReactDOM.render(<App />, document.getElementById('app'))
  const scrollDiv = document.getElementById('messageScroller')
  if (scrollDiv) {
    scrollDiv.scrollTo({ top: scrollDiv.scrollHeight, behavior: 'smooth' })
  }
}

// socket events
socket.on('update-sockets', () => {
  console.log('update event')
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
loadSession()
pullRender().then(() => {
  loading = false
  renderApp()
})

class App extends Component {
  setUserName = (username) => {
    let isAdmin = true
    userArray.forEach(user => {
      if (user.isAdmin === true) isAdmin = false
    })
    addUser(ssID, username, isAdmin)
      .then(user => {
        saveSession(user)
        socket.emit('set-state', { id: sessionId, isAdmin: sessionAdmin, userName: sessionName })
        socket.emit('change-occured')
      })
  }

  sendMessage = (message, recipients) => {
    console.log('message being sent')
    console.log('r', recipients.length, recipients.length === 0)
    if (recipients.length === 0) recipients = userArray.map(user => user.id)
    else if (!recipients.includes(sessionId)) recipients.push(sessionId)
    console.log('r', recipients)

    return addMessage(ssID, sessionName, recipients, message)
      .then(obj => {
        socket.emit('change-occured')
      })
  }

  render () {
    return (
      <>
        <div style={{ paddingTop: '5vh' }}>
          {loading
            ? <Dimmer active>
              <Loader className='teal'/>
            </Dimmer>
            : (sessionId !== 'null' && sessionId)
              ? <ChatTemplate
                socket={socket}
                messageArray={messageArray}
                userArray={userArray}
                sendMessage={this.sendMessage}
                fullPath={fullPath}
                handleKickUser={handleKickUser}
                handleResetFirestore={handleResetFirestore}
                sessionAdmin={sessionAdmin}
                sessionId={sessionId}
                sessionName={sessionName}
                renderApp={renderApp}
              />
              : <LoginLayout ssID={ssID} setUserName={this.setUserName} userArray={userArray}/>
          }
        </div>
      </>
    )
  }
}

export default App
