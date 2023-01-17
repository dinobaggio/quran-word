import express from 'express'
import { syncQuran, topWordQuran } from '../../controllers/api/quranController.'

const router = express.Router()

router.get('/sync-quran', syncQuran)
router.get('/top-word-quran', topWordQuran)

export default router
