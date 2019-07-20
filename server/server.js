const path = require('path')
const express = require('express')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

module.exports = {
  server,
  app,
  io,
  path
}
