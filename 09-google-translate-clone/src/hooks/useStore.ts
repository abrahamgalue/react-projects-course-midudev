import { useReducer } from 'react'
import { Action, FromLanguage, Language, State } from '../types'
import { AUTO_LANGUAGE } from '../constants'

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
}

function reducer(state: State, action: Action) {
  const { type } = action

  switch (type) {
    case 'INTERCHANGE_LANGUAGES': {
      // lógica del estado dentro del componente
      // lo evitamos en los componentes
      if (state.fromLanguage === AUTO_LANGUAGE) return state

      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage,
      }
    }
    case 'SET_FROM_LANGUAGE': {
      return {
        ...state,
        fromLanguage: action.payload,
      }
    }
    case 'SET_TO_LANGUAGE': {
      return {
        ...state,
        toLanguage: action.payload,
      }
    }
    case 'SET_FROM_TEXT': {
      return {
        ...state,
        fromText: action.payload,
        result: '',
        loading: true,
      }
    }
    case 'SET_RESULT': {
      return {
        ...state,
        result: action.payload,
        loading: false,
      }
    }
  }

  return state
}

export function useStore() {
  const [{ fromLanguage, toLanguage, fromText, result, loading }, dispatch] =
    useReducer(reducer, initialState)

  const interchangeLanguages = () => dispatch({ type: 'INTERCHANGE_LANGUAGES' })

  const setFromLanguage = (payload: FromLanguage) =>
    dispatch({ type: 'SET_FROM_LANGUAGE', payload })

  const setToLanguage = (payload: Language) =>
    dispatch({ type: 'SET_TO_LANGUAGE', payload })

  const setFromText = (payload: string) =>
    dispatch({ type: 'SET_FROM_TEXT', payload })

  const setResult = (payload: string) =>
    dispatch({ type: 'SET_RESULT', payload })

  return {
    fromLanguage,
    toLanguage,
    fromText,
    result,
    loading,
    interchangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult,
  }
}
