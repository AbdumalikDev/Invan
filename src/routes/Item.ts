import { Router } from 'express'
import { AuthMiddleware } from '../controllers/auth'
import {ItemController} from '../controllers/Item'

const router = Router({ mergeParams: true })
const controller = new ItemController()

router.route('/').get(AuthMiddleware, controller.getAll)
router.route('/create').post(AuthMiddleware, controller.create)
router.route('/update/:id').patch(AuthMiddleware, controller.update)
router.route('/delete/:id').delete(AuthMiddleware, controller.delete)


export default router