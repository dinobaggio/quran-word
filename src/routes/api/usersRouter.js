import express from 'express'
import { list, create, update, destroy, detail } from '../../controllers/api/usersController'
import { isAuthenticate } from '../../libs/middlewares/authMiddleware'
import { 
  create as createValidator,
  update as updateValidator
} from '../../libs/middlewares/validators/usersValidator'

const router = express.Router()

router.get('/', isAuthenticate, list)
router.post('/', isAuthenticate, createValidator(), create)
router.get('/:uuid', isAuthenticate, detail)
router.put('/:uuid', isAuthenticate, updateValidator(), update)
router.delete('/:uuid', isAuthenticate, destroy)

export default router
