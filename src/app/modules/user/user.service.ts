import config from '../../../config'
import { IUser } from './user.interface'
import { User } from './user.model'
import { genareteUserId } from './user.utils'

const createUser = async (user: IUser) => {
  // auto increment id

  const lastUser = await User.findOne(
    {},
    { id: 1, _id: 0 },
    { sort: { createdAt: -1 } },
  ).lean()
  user.id = genareteUserId(lastUser) as string

  //default password
  if (!user.password) {
    user.password = config.defaultUserPassword as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('User could not be created')
  }
  return createdUser.toObject() as IUser
}

export const userService = {
  createUser,
}
