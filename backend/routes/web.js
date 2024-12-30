import express from 'express'
import { view404PageNotFound, viewDetailKost, viewHomePage, viewLoginPage, viewPengajuanSewa, viewProfilPage, viewSearchPage, viewSignupPage } from '../controllers/general.controller.js'
import { userLogin, userLogout } from '../controllers/user.controller.js'
import { viewDashboard, viewDetailAsetKost, viewPengelola, viewStatisticsRoomKost, viewTambahAset, viewTambahPengelola, viewTambahRuang } from '../controllers/owner.controller.js'
import { checkUserAuth } from '../middleware/auth.middleware.js'
import { USER_TYPE } from '../models/User.js'


const router = express.Router()

router.get('/', viewHomePage)
router.get('/login', viewLoginPage)
router.get('/signup', viewSignupPage)
router.get('/profil', checkUserAuth(USER_TYPE.penyewa), viewProfilPage)
router.get('/search', viewSearchPage)
router.get('/detail-kost/:id', viewDetailKost)
router.get('/pengajuan-sewa', checkUserAuth(USER_TYPE.penyewa), viewPengajuanSewa)

router.post('/user/login', userLogin)
router.post('/logout', userLogout)


router.get('/dashboard', checkUserAuth(USER_TYPE.pemilik), viewDashboard)
router.get('/pengelola', checkUserAuth(USER_TYPE.pemilik), viewPengelola)
router.get('/tambah-aset', checkUserAuth(USER_TYPE.pemilik), viewTambahAset)
router.get('/detail-aset-kost', checkUserAuth(USER_TYPE.pemilik), viewDetailAsetKost)
router.get('/tambah-ruang', checkUserAuth(USER_TYPE.pemilik), viewTambahRuang)
router.get('/statistics-room-kost', checkUserAuth(USER_TYPE.pemilik), viewStatisticsRoomKost)
router.get('/tambah-pengelola', checkUserAuth(USER_TYPE.pemilik), viewTambahPengelola)


router.get('/*', view404PageNotFound)

export default router
