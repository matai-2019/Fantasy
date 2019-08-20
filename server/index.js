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
let userArr = []
io.on('connection', socket => {
  let userId, ssID, userName
  socket.on('set-state', userState => {
    userId = userState.id
    userName = userState.userName
    ssID = userState.ssID
    if (userId !== null && userId !== undefined) userArr.push({ name: userName, id: userId })
    console.log('set', userArr)
  })
  socket.on('change-occured', () => {
    io.emit('update-sockets')
  })
  socket.on('disconnect', () => {
    console.log('DC', userId)
    if (userId === undefined || userId === null) return null
    else {
      const dcArr = []
      userArr.forEach(obj => {
        if (userId !== obj.id) dcArr.push(obj)
      })
      userArr = dcArr
      console.log('dc', userArr)
      setTimeout(() => {
        let dc = true
        userArr.forEach(obj => {
          if (obj.id === userId && obj.name === userName) { console.log('reconnected'); dc = false }
        })
        if (dc) {
          removeUser(ssID, userId)
            .then(rtn => {
              io.emit('update-sockets')
            })
        }
      }, 4000)
    }
  })
})

server.listen(port, function () {
  // eslint-disable-next-line no-console
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
