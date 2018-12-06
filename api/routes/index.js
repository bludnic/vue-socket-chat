import message from './message'

export default (app, prefix = '') => {
  app.use(message.prefix(prefix).routes())
}
