import React from 'react'
import io from 'socket.io-client'

const socket = io()

const App = () => {
  return (
    <h1>React development has begun!</h1>
  )
}

export default App
