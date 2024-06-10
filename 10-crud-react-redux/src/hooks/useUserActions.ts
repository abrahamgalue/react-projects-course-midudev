import {
  User,
  UserId,
  addNewUser,
  deleteUserById,
} from '../features/users/userSlice'
import { useAppDispatch } from './useStore'

export const useUserAction = () => {
  const dispatch = useAppDispatch()

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }))
  }

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { addUser, removeUser }
}
