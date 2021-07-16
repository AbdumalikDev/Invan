import { Router } from 'express'
import { AuditController } from '../controllers/audit'
import { AuthMiddleware } from '../controllers/auth'

const router = Router({ mergeParams: true })
const controller = new AuditController()

router.route('/all').get(AuthMiddleware, controller.getAll)

export default router
