const { server, io } = require('./server')

const port = process.env.PORT || 3000

io.on('connection', socket => {
  console.log('a user connected')
})

server.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})
