import { useState } from 'react'
import { type TodoTitle } from '../type'

interface Props {
  saveTodo: ({ title }: TodoTitle) => void
}

export const CreateTodo: React.FC<Props> = ({ saveTodo }) => {
  const [inputValue, setInputValue] = useState('')

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault()
    saveTodo({ title: inputValue })
    setInputValue('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        name='todo-input'
        className='new-todo'
        value={inputValue}
        onChange={event => {
          setInputValue(event.target.value)
        }}
        placeholder='¿Qué quieres hacer?'
        autoFocus
      />
    </form>
  )
}
