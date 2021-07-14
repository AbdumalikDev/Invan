import { Router } from 'express'
import { AuthMiddleware } from '../controllers/auth'
import { ContractorController } from '../controllers/contractor'

const router = Router({ mergeParams: true })
const controller = new ContractorController()

router.route('/').get(AuthMiddleware, controller.getAll)
router.route('/create').post(AuthMiddleware, controller.create)
router.route('/update/:id').patch(AuthMiddleware, controller.update)
router.route('/delete/:id').delete(AuthMiddleware, controller.delete)


export default router