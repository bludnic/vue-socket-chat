import Router from 'koa-router'

import Controller from './../controllers/message'

const router = new Router()
const { getMessages } = Controller({})

router.get('/menu', getMessages)

export default router
