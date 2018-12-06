import http from 'http'
import Socket from 'socket.io'
import Koa from 'koa'
import bodyParser from 'koa-body'

import Routes from './routes'

const app = new Koa()

// Register middlewares
app.use(bodyParser({ multipart: true }))

// Register routes
Routes(app)

// Create server
const server = http.createServer(app.callback())
const io = Socket(server)

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

// Export the server middleware
export default {
  path: '/api',
  handler: server
}
