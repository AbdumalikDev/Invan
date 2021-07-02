import { Router } from 'express'
import { UnitController } from '../controllers/unit'

const router = Router({ mergeParams: true })
const controller = new UnitController()

router.route('/create').post(controller.create)

export default router
