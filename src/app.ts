import express, { Request, Response } from 'express'
import cors from 'cors'
import routes from './routes/index'
import { expressLogger } from './config/logger'
import { ErrorController } from './controllers/error'
<<<<<<< HEAD
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger'
=======
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger"
import path from "path"

>>>>>>> mainsam

const app = express()
const errorController = new ErrorController()
// middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(expressLogger())

app.use(routes)
<<<<<<< HEAD
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))
=======


app.use('/api-docs',swaggerUi.serve, swaggerUi.setup(swaggerDocs))
>>>>>>> mainsam

app.get('/status', (req: Request, res: Response) => {
    res.json({
        status: 'OK'
    })
})


app.use(errorController.hanle)

export default app
