import { Router } from 'express'
import { UnitController } from '../controllers/unit'
import { AuthMiddleware } from '../controllers/auth'

const router = Router({ mergeParams: true })
const controller = new UnitController()

router.route('/').get(AuthMiddleware, controller.getAll)
router.route('/create').post(AuthMiddleware, controller.create)
router.route('/update/:id').patch(AuthMiddleware, controller.update)
router.route('/delete/:id').delete(AuthMiddleware, controller.delete)

export default router
