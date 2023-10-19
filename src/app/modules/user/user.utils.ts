import { IUser } from './user.interface'

export const genareteUserId = (lasUser: IUser | null) => {
  if (!lasUser) {
    return (1).toString().padStart(5, '0')
  }
  const lastUserId = parseInt(lasUser.id)
  return (lastUserId + 1).toString().padStart(5, '0')
}
