import Koa from 'koa'
import bodyParser from 'koa-body'

import Routes from './routes'

const app = new Koa()

// Register middlewares
app.use(bodyParser({ multipart: true }))

// Register routes
Routes(app)

// Export the server middleware
export default {
  path: '/api',
  handler: app.callback()
}
