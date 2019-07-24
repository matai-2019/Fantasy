const { server, io, path, app } = require('./server')
const port = process.env.PORT || 3000

io.on('connection', socket => {
  let userId
  socket.emit('load-user')
  socket.on('set-state', userState => {
    userId = userState.id
    io.emit('pull-users')
    io.emit('pull-messages')
  })
  socket.on('change-occured', () => {
    io.emit('update-sockets')
  })
  socket.on('disconnect', () => {
  })
})

server.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})

console.log(path.join(__dirname, '../build/index.html'))

app.get('/', (req, res) => {
  res.send('TO BE DONE')
})
app.get('/**', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'))
})
