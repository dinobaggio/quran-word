import express from 'express'
import { create, update, destroy } from '../../controllers/amqp/usersController'
import { isAuthenticate } from '../../libs/middlewares/authMiddleware'
import { 
  create as createValidator,
  update as updateValidator
} from '../../libs/middlewares/validators/usersValidator'

const router = express.Router()

router.post('/', isAuthenticate, createValidator(), create)
router.put('/:uuid', isAuthenticate, updateValidator(), update)
router.delete('/:uuid', isAuthenticate, destroy)

export default router
