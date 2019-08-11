const { server, io, path, app } = require('./server')

const firebase = require('firebase/app')
require('firebase/firestore')
require('dotenv')
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DB_URL,
  projectId: 'fantasy-scroll',
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MSG_SEND_ID,
  appId: process.env.APP_ID
}
const fire = firebase.initializeApp(firebaseConfig)
const db = fire.firestore()

const port = process.env.PORT || 3000

io.on('connection', socket => {
  let userId, ssID
  socket.on('set-state', userState => {
    userId = userState.id
    ssID = userState.ssID
  })
  socket.on('change-occured', () => {
    io.emit('update-sockets')
  })
  socket.on('disconnect', () => {
    io.emit('dc-user', userId)
    console.log('DC USID', userId, typeof userId)
    console.log('DC SSID', ssID, typeof ssID)
    if (userId === undefined || userId === null) console.log('no user')
    else console.log('remove user on dc')// removeUser(ssID, userId)
    socket.emit('clear-ss')
  })
})

server.listen(port, function () {
  // eslint-disable-next-line no-consoleq
  console.log('Listening on port', port)
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/base.html'))
})
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})

const removeUser = (sessionId, Userid) => {
  return db.collection(sessionId).doc('Users').get()
    .then(obj => {
      obj = obj.data()
      const removed = obj.users.filter(user => user.id === Userid)[0]
      const index = obj.users.indexOf(removed)
      if (index !== -1) obj.users.splice(index, 1)
      return obj
    })
    .then((obj) => {
      return db.collection(sessionId).doc('Users').set(obj)
        .then(() => {
          return obj
        })
    })
}
