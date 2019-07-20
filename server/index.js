const { server, io, path, app } = require('./server')
// const { getSession } = require('../client/index')
const port = process.env.PORT || 3000

io.on('connection', socket => {
  let userId
  console.log('a user connected')
  socket.emit('get-state')
  socket.on('set-state', userState => {
    userId = userState.id
    socket.emit('state-loaded', userState.id)
  })
  socket.on('state-loaded', () => {
    if (userId) console.log('Chat-screen')
    else console.log('Login-screen')
  })
})

server.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})

app.get('/', (req, res) => {
  res.sendfile(path.join(__dirname, '../public/base.html'))
})

app.get('/:sessionId', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/app.html'))
})
