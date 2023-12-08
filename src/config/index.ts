import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.join(
    process.cwd(),
    // process.env.NODE_ENV === 'production' ? '.env' : '.env.dev',
    '.env'
  ),
})

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  defaultUserPassword: process.env.DEFAULT_USER_PASSWORD,
}
