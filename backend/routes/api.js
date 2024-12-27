import express from 'express'
import { getAllKost, getSingleKost } from '../controllers/kost.controller.js'
import { checkUserAuth, userLogin, userLogout } from '../controllers/user.controller.js'

const router = express.Router()


router.get('/kost', getAllKost)
router.get('/kost/:id', getSingleKost)

router.get('/user', checkUserAuth)
router.post('/user/login', userLogin)
router.post('/user/logout', userLogout)


export default router
