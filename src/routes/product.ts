import { Router } from 'express'
import { AuthMiddleware } from '../controllers/auth'
import { ProductController } from '../controllers/product'

const router = Router({ mergeParams: true })
const controller = new ProductController()

router.route('/all').get(AuthMiddleware, controller.getAll)
router.route('/:id').get(AuthMiddleware, controller.getOne)
router.route('/search/:search').get(AuthMiddleware, controller.search)
router.route('/create').post(AuthMiddleware, controller.create)
router.route('/update/:id').patch(AuthMiddleware, controller.update)
router.route('/delete').delete(AuthMiddleware, controller.delete)

export default router
