import express from 'express'
import { viewHomePage, viewLoginPage } from '../controllers/general.controller.js'


const router = express.Router()

router.get('/', viewHomePage)
router.get('/login', viewLoginPage)

export default router
