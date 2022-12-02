import express from 'express'
import { list } from '../../controllers/api/usersController'
import { isAuthenticate } from '../../libs/middlewares/authMiddleware'

const router = express.Router()

router.get('/', isAuthenticate, list)

export default router
