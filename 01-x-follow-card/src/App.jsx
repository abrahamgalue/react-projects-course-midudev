import './App.css'
import styled from 'styled-components'
import { XFollowCard } from './XFollowCard.jsx'
import { users } from './mocks/users'

const Users = styled.section`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export function App() {
  return (
    <Users className='App'>
      {users.map(({ userName, name, isFollowing }) => (
        <XFollowCard
          key={userName}
          userName={userName}
          initialIsFollowing={isFollowing}
        >
          {name}
        </XFollowCard>
      ))}
    </Users>
  )
}
