import { Router } from 'express'
import { AuthMiddleware } from '../controllers/auth'
import { UserController } from '../controllers/user'

const router = Router({ mergeParams: true })
const controller = new UserController()

router.route('/register').post(controller.register)
router.route('/login').post(controller.login)
router.route('/admin').get(AuthMiddleware, controller.admin)
router.route('/logout').get(AuthMiddleware,controller.logout)
export default router
