import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'Yazman Rodriguez',
    email: 'yazmanito@gmail.com',
    github: 'yazmanito',
  },
  {
    id: '2',
    name: 'John Doe',
    email: 'leo@gmail.com',
    github: 'leo',
  },
  {
    id: '3',
    name: 'Haakon Dahlberg',
    email: 'haakon@gmail.com',
    github: 'abrahamgalue',
  },
]

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = (() => {
  const persistanceState = localStorage.getItem('__redux__state__')
  if (persistanceState) {
    return JSON.parse(persistanceState).users
  }
  return DEFAULT_STATE
})()

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()

      return [
        ...state,
        {
          id,
          ...action.payload,
        },
      ]
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter(user => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some(
        user => user.id === action.payload.id
      )
      if (!isUserAlreadyDefined) {
        return [...state, action.payload]
      }
    },
  },
})

export default userSlice.reducer

export const { addNewUser, deleteUserById, rollbackUser } = userSlice.actions
