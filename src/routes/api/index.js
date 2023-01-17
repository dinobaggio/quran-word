import express from 'express'
import quranRouter from './quranRouter'

const router = express.Router()

router.get('/', (req, res) => res.status(200).json({ message: req.t('message.success') }))
router.use('/quran', quranRouter)

export default router
