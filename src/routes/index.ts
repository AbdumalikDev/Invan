import { Router } from 'express'
import userRouter from './employee'
import productRouter from './product'
import unitRouter from './unit'
import categoryRouter from './category'
import auditRouter from './audit'

const router = Router({ mergeParams: true })

router.use('/employee', userRouter)
router.use('/product', productRouter)
router.use('/unit', unitRouter)
router.use('/category', categoryRouter)
router.use('/audit', auditRouter)

export default router
