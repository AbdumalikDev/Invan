import { Router } from 'express'
import { CategoryController } from '../controllers/category'

const router = Router({ mergeParams: true })
const controller = new CategoryController()

router.route('/create').post(controller.create)

export default router
