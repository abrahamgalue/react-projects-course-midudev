import { type Middleware, configureStore } from '@reduxjs/toolkit'
import userReducer, { rollbackUser } from '../features/users/userSlice'
import { toast } from 'sonner'

interface ActionWithPayload<Type = string, Payload = unknown> {
  type: Type
  payload?: Payload
}

export const persistanceLocalStorageMiddleWare: Middleware =
  store => next => action => {
    next(action)
    localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
  }

const syncWithDatabaseMiddleware: Middleware = store => next => action => {
  const { type, payload } = action as ActionWithPayload
  const previousState = store.getState() as RootState
  next(action)

  if (type === 'users/deleteUserById') {
    // <- eliminado un usuario
    const userIdToRemove = payload
    const userToRemove = previousState.users.find(
      user => user.id === userIdToRemove
    )

    fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
      method: 'DELETE',
    })
      .then(res => {
        /* 
          Comment on these lines and disable the error
          to see the optimistic update
        */
        if (res.ok) {
          toast.success(`Usuario ${payload} eliminado correctamente`)
        }
        // throw new Error('Error al eliminar el usuario')
      })
      .catch(err => {
        toast.error(`Error deleting user ${userIdToRemove}`)
        if (userToRemove) store.dispatch(rollbackUser(userToRemove))
        console.log(err)
        console.log('error')
      })
  }
}

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      persistanceLocalStorageMiddleWare,
      syncWithDatabaseMiddleware
    ),
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
