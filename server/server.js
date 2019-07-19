const path = require('path')
const express = require('express')
const firebase = require('firebase')
// require('firebase / firestore')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, '../public')))

module.exports = {
  server,
  firebase
}
