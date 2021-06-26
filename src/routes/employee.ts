import { Router } from 'express'
import { AuthMiddleware } from '../controllers/auth'
import { OrgController } from '../controllers/organization'
import { UserValidator } from '../validators/user'

const router = Router({ mergeParams: true })
const controller = new OrgController()
const validator = new UserValidator()

router.route('/register').post(controller.create)
// router.route('/login').post(validator.login, controller.login)
// router.route('/admin').get(AuthMiddleware, controller.admin)
router.route('/logout').get(AuthMiddleware, controller.logout)
// router.route('/audit').get(AuthMiddleware, controller.audit).delete(AuthMiddleware, controller.deleteaudit)

export default router
