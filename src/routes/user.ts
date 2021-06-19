import { Router } from 'express'
import { AuthMiddleware } from '../controllers/auth'
import { UserController } from '../controllers/user'
import { UserValidator } from '../validators/user'

const router = Router({ mergeParams: true })
const controller = new UserController()
const validator = new UserValidator()

router.route('/register').post(validator.register, controller.register)
router.route('/login').post(validator.login, controller.login)
router.route('/admin').get(AuthMiddleware, controller.admin)
router.route('/admin/first').get(AuthMiddleware, controller.adminfirst)
router.route('/admin/second').get(AuthMiddleware, controller.adminsecond)
router.route('/admin/third').get(AuthMiddleware, controller.adminthird)
router.route('/logout').get(AuthMiddleware,controller.logout)
router.route('/audit').get(AuthMiddleware, controller.audit).delete(AuthMiddleware, controller.deleteaudit)

export default router
