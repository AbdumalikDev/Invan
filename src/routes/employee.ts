import { Router } from 'express'
import { AuthMiddleware } from '../controllers/auth'
import { OrgController } from '../controllers/organization'
import { EmployeeController } from '../controllers/employee'
import { UserValidator } from '../validators/user'

const router = Router({ mergeParams: true })
const orgController = new OrgController()
const empController = new EmployeeController()
const validator = new UserValidator()

router.route('/register').post(validator.register, orgController.create)
router.route('/login').post(validator.login, empController.login)
router.route('/admin').get(AuthMiddleware, orgController.admin)
router.route('/logout').get(AuthMiddleware, orgController.logout)

// router.route('/audit').get(AuthMiddleware, controller.audit).delete(AuthMiddleware, controller.deleteaudit)

export default router
