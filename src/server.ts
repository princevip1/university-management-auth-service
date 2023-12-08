import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorLogger, logger } from './shared/logger'
import { Server } from 'http'


process.on('uncaughtException', (error) => {
  errorLogger.error(error)
  process.exit(1)
})

let server: Server

async function bootStrap() {

  try {
    await mongoose.connect(config.mongoURI as string)
    logger.info('Connected to database')
    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('Error connecting to database: ', error)
  }
  process.on('unhandledRejection', (error) => {
    if (server) {
      server.close(() => {
        errorLogger.error(error)
        process.exit(1)
      })
    } else {
      errorLogger.error(error)
      process.exit(1)
    }

  })
}

bootStrap()

// process.on('SIGTERM', () => {
//   logger.info('SIGTERM signal received: closing HTTP server')
//   if (server) {
//     server.close(() => {
//       console.log('HTTP server closed')
//     })
//   }
// })