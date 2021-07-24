import { Router } from 'express'
import { AuthMiddleware } from '../controllers/auth'
import { ProductController } from '../controllers/product'

const router = Router({ mergeParams: true })
const controller = new ProductController()

router.route('/all').get(AuthMiddleware, controller.getAll)
router.route('/:id').get(AuthMiddleware, controller.getOne)
router.route('/create').post(AuthMiddleware, controller.create)
router.route('/update/:id').patch(AuthMiddleware, controller.update)
router.route('/delete/:id').delete(AuthMiddleware, controller.delete)

export default router
