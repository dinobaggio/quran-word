import express from 'express'
import { login } from '../../controllers/api/authController'
import { login as loginValidate } from '../../libs/validators/authValidator'

const router = express.Router()

router.post('/login', loginValidate(), login)

export default router
