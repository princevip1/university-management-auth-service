import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'

import globalErrorHandler from './app/middlewares/globalErrorHandler'
import routes from './routes'
import httpStatus from 'http-status'
import { swaggerSpec } from './apiDoc'

// import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const app: Application = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


// application routes
app.use('/api/v1', routes)



// api-doc 

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec, { explorer: true })
);

// test route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Welcome to Express TS Starter',
  })
})


// error handler
app.use(globalErrorHandler)


// handle not found 
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: "Not Found",
    errors: [{
      path: ".",
      message: "Api Not Found"
    }]
  })
  next()
})


export default app
