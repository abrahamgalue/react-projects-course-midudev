import { TodoTitle } from '../type'
import { CreateTodo } from './CreateTodo'

interface Props {
  onAddTodo: ({ title }: TodoTitle) => void
}

export const Header: React.FC<Props> = ({ onAddTodo }) => {
  return (
    <header className='header'>
      <h1 style={{ userSelect: 'none' }}>
        todo
        <img
          style={{ width: '60px', height: 'auto' }}
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Typescript.svg/1024px-Typescript.svg.png'
          alt='TypeScript logo'
        />
      </h1>

      <CreateTodo saveTodo={onAddTodo} />
    </header>
  )
}
