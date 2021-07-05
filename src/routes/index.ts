import { Router } from 'express'
import userRouter from './employee'
import productRouter from './product'
import unitRouter from './unit'
import categoryRouter from './category'
import express from 'express'
import path from 'path'

const router = Router({ mergeParams: true })

router.use('/employee', userRouter)
router.use('/product', productRouter)
router.use('/unit', unitRouter)
router.use('/category', categoryRouter)
router.use('/employee/image', express.static(path.join(__dirname, '../', 'assets', 'images')))

export default router
