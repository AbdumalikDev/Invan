import { Router } from 'express'
import userRouter from './employee'
import productRouter from './product'
import unitRouter from './unit'
import categoryRouter from './category'
import express from 'express'
import path from 'path'
import auditRouter from './audit'
import receiptRouter from './receipt'
import itemRouter from './item'
import contractorRouter from './contractor'
import incomeRouter from './income'
import outcomeRouter from './outcome'
import shipmentRouter from './shipment'
import warehouseRouter from './warehouse'

const router = Router({ mergeParams: true })

router.use('/employee', userRouter)
router.use('/product', productRouter)
router.use('/unit', unitRouter)
router.use('/category', categoryRouter)
router.use('/employee/image', express.static(path.join(__dirname, '../', 'assets', 'images')))
router.use('/audit', auditRouter)
router.use('/receipt', receiptRouter)
router.use('/item', itemRouter)
router.use('/contractor', contractorRouter)
router.use('/income', incomeRouter)
router.use('/outcome', outcomeRouter)
router.use('/shipment', shipmentRouter)
router.use('/warehouse', warehouseRouter)

export default router
