import express from 'express'
import { list, create } from '../../controllers/api/usersController'
import { isAuthenticate } from '../../libs/middlewares/authMiddleware'
import { create as createValidator } from '../../libs/middlewares/validators/usersValidator'

const router = express.Router()

router.get('/', isAuthenticate, list)
router.post('/', isAuthenticate, createValidator(), create)

export default router
