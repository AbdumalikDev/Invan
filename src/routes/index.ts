import { Router } from 'express'
import userRouter from './employee'

const router = Router({ mergeParams: true })

router.use('/employee', userRouter)
export default router
