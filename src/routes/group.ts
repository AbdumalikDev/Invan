import { Router } from 'express'
import { GroupController } from '../controllers/group'
import { AuthMiddleware } from '../controllers/auth'
import { GroupValidator } from '../validators/group'

const router = Router({ mergeParams: true })
const controller = new GroupController()

router.route('/all').get(AuthMiddleware, controller.getAll)
router.route('/:id').get(AuthMiddleware, controller.getOne)
router.route('/create').post(AuthMiddleware, controller.create)
router.route('/update/:id').patch(AuthMiddleware, controller.update)
router.route('/delete').delete(AuthMiddleware, controller.delete)

export default router
