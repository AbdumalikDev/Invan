import { Router } from 'express'
import { AuthMiddleware } from '../controllers/auth'
import { IncomeController } from '../controllers/income'

const router = Router({ mergeParams: true })
const controller = new IncomeController()

router.route('/all').get(AuthMiddleware, controller.getAll)
router.route('/create').post(AuthMiddleware, controller.create)
router.route('/update/:id').patch(AuthMiddleware, controller.update)
router.route('/delete').delete(AuthMiddleware, controller.delete)

export default router
