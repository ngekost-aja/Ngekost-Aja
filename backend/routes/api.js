import express from 'express'
import { getAllKost } from '../controllers/kost.controller.js'

const router = express.Router()


router.get('/kost', getAllKost)


export default router
