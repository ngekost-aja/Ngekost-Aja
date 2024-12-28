import express from 'express'
import { viewHomePage } from '../controllers/general.controller.js'


const router = express.Router()

router.get('/', viewHomePage)

export default router
