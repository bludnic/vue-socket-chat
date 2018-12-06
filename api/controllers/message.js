export default (db) => {
  function getMessages (ctx, next) {
    ctx.body = ['asd']
  }

  return {
    getMessages
  }
}
