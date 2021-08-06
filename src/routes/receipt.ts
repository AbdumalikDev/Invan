import { Router } from 'express'
import { AuthMiddleware } from '../controllers/auth'
import { ReceiptController } from '../controllers/receipt'

const router = Router({ mergeParams: true })
const controller = new ReceiptController()

router.route('/all').get(AuthMiddleware, controller.getAll)
router.route('/:id').get(AuthMiddleware, controller.getOne)
router.route('/create').post(AuthMiddleware, controller.create)
router.route('/update/:id').patch(AuthMiddleware, controller.update)
router.route('/delete').delete(AuthMiddleware, controller.delete)

export default router
