import React, { Component } from 'react'
import AdminLayout from './AdminLayout'
import LoginLayout from './LoginLayout'
import { ChatTemplate, ButtonExamplePositive } from './ChatLayout'
import { getAllUsers, getAllMessages, addUser, addMessage, getNewID, resetFirestore } from '../../server/firestore/fsdb'
import io from 'socket.io-client'

const socket = io()

const saveSession = state => {
  const { id, isAdmin, userName } = state.user
  sessionStorage.setItem(id)
  sessionStorage.setItem(isAdmin)
  sessionStorage.setItem(userName)
  sessionId = id
  sessionAdmin = isAdmin
  sessionName = userName
}
const loadSession = state => {
  sessionId = sessionStorage.getItem('id')
  sessionAdmin = sessionStorage.getItem('isAdmin')
  sessionName = sessionStorage.getItem('userName')
}
const ssID = window.location.pathname.slice(1)

socket.on('get-state', () => {
  socket.emit('set-state', { id: sessionId, isAdmin: sessionAdmin, userName: sessionName })
})

let sessionId, sessionAdmin, sessionName
loadSession()
console.log('SESSIONID', ssID)
console.log('NEWID', getNewID())

class App extends Component {
  state = {
    user: { id: sessionId, isAdmin: sessionAdmin, userName: sessionName }
  }

  setUserName = username => {
    console.log('UN TEST', username)
    // addUser('TestBed', username)
    //   .then(user => {
    //     this.setState({ user }, () => console.log('YEE', this.state))
    //   })
  }

  users = []
  messages = []

  render () {
    return (
      <>
        <h1>Welcome to Fantasy!!!</h1>
        {/* <LoginLayout setUserName={this.setUserName}/> */}
        { console.log('RENDER STATE', this.state)}
        {(this.state.user.id)
          ? <>
            <ChatTemplate/>
            <ButtonExamplePositive />
          </>
          : <LoginLayout setUserName={this.setUserName}/>}
        {/* <ChatTemplate />
        <ButtonExamplePositive /> */}
      </>
    )
  }
}

export default App
