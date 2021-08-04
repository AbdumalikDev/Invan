import { Router } from 'express'
import { CategoryController } from '../controllers/category'
import { AuthMiddleware } from '../controllers/auth'

const router = Router({ mergeParams: true })
const controller = new CategoryController()

router.route('/all').get(AuthMiddleware, controller.getAll)
router.route('/all/parents').get(AuthMiddleware, controller.getAllParents)
router.route('/:id').get(AuthMiddleware, controller.getOne)
router.route('/create').post(AuthMiddleware, controller.create)
router.route('/update/:id').patch(AuthMiddleware, controller.update)
router.route('/delete/:id').delete(AuthMiddleware, controller.delete)

export default router
