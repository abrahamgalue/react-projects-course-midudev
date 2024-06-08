import { UserId, deleteUserById } from '../features/users/userSlice'
import { useAppDispatch } from './useStore'

export const useUserAction = () => {
  const dispatch = useAppDispatch()

  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { removeUser }
}
