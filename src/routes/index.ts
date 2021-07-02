import { Router } from 'express'
import userRouter from './employee'
import productRouter from './product'
import unitRouter from './unit'
import categoryRouter from './category'

const router = Router({ mergeParams: true })

router.use('/employee', userRouter)
router.use('/product', productRouter)
router.use('/unit', unitRouter)
router.use('/category', categoryRouter)

export default router
