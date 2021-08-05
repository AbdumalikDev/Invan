import express, { Request, Response } from 'express'
import cors from 'cors'
import routes from './routes/index'
import { expressLogger } from './config/logger'
import { ErrorController } from './controllers/error'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger'
import Category from './models/Category'
import Product from './models/Product'

const app = express()
const errorController = new ErrorController()
// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressLogger())

app.use(routes)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

app.get('/status', (req: Request, res: Response) => {
    res.json({
        status: 'OK'
    })
})
// ;(async (_) => {
//     await Category.deleteMany({})
//     await Product.deleteMany({})
// })()

app.use(errorController.hanle)

export default app
