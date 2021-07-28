import { Router } from 'express'
import { GroupWarehouseController } from '../controllers/group_warehouse'
import { AuthMiddleware } from '../controllers/auth'

const router = Router({ mergeParams: true })
const controller = new GroupWarehouseController()

router.route('/all').get(AuthMiddleware, controller.getAll)
router.route('/:id').get(AuthMiddleware, controller.getOne)
router.route('/create').post(AuthMiddleware, controller.create)
router.route('/delete/:id').delete(AuthMiddleware, controller.delete)
router.route('/update/:id').patch(AuthMiddleware, controller.update)

export default router
