import { Square } from './Square'
import styled from 'styled-components'

const GameContainer = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`

export function Board({ board, updateBoard }) {
  return (
    <GameContainer>
      {board.map((square, index) => {
        return (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {square}
          </Square>
        )
      })}
    </GameContainer>
  )
}
