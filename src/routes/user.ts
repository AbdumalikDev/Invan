import { Router } from 'express'
import { UserController } from '../controllers/user'

const router = Router({ mergeParams: true })
const controller = new UserController()

router.route('/register').post(controller.register)

export default router
