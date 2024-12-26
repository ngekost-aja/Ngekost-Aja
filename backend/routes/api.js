import express from 'express'
import { getAllKost, getSingleKost } from '../controllers/kost.controller.js'

const router = express.Router()


router.get('/kost', getAllKost)
router.get('/kost/:id', getSingleKost)


export default router
