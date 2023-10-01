import { Square } from './Square.jsx'
import styled from 'styled-components'

const WinnerContainer = styled.section`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  display: grid;
  place-items: center;
  background-color: rgba(0, 0, 0, 0.7);
`

const WinnerText = styled.div`
  background: #202124;
  height: 300px;
  width: 320px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
`

const Winner = styled.header`
  margin: 0 auto;
  width: fit-content;
  display: flex;
  gap: 15px;

  div {
    width: 70px;
    height: 70px;
    pointer-events: none;
    border-color: transparent;
  }
`

export function WinnerModal({ winner, resetGame }) {
  if (winner === null) return null

  const winnerText = winner === false ? 'Tie' : 'Wins:'

  return (
    <WinnerContainer>
      <WinnerText>
        <h2>{winnerText}</h2>

        <Winner>{winner && <Square>{winner}</Square>}</Winner>

        <footer>
          <button onClick={resetGame}>Start again</button>
        </footer>
      </WinnerText>
    </WinnerContainer>
  )
}
