import type { AppDispatch, RootState } from '../app/store'
import { useSelector, useDispatch } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'

// Creamos nuestras propias funciones para tomar el estado y modificarlo
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useAppDispatch: () => AppDispatch = useDispatch
