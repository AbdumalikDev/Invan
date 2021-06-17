import { Router } from 'express'
import { UserController } from '../controllers/user'

const router = Router({ mergeParams: true })
const controller = new UserController()

router.route('/register').post(controller.register)
router.route('/login').post(controller.login)

export default router
