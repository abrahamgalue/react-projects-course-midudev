import styled from 'styled-components'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './Square'
import { TURNS } from '../constants'
import { checkWinnerFrom, checkEndGame } from '../logic/board'
import { WinnerModal } from './WinnerModal'
import { saveGameToStorage, resetGameStorage } from '../logic/storage'
import { Board } from './Board'

const BoardContainer = styled.main`
  width: fit-content;
  margin: 40px auto;
  text-align: center;

  & > h1 {
    color: #fff;
    margin-bottom: 60px;
    user-select: none;
  }

  & button {
    padding: 8px 12px;
    margin: 25px;
    background: #202124;
    border: none;
    color: #14bdac;
    width: 120px;
    border-radius: 25px;
    transition: 0.2s;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
  }

  & button:hover {
    background: #eee;
    color: #222;
  }
`

const Turn = styled.section`
  display: flex;
  justify-content: center;
  margin: 15px auto;
  width: fit-content;
  position: relative;
  border-radius: 10px;

  & div {
    width: 70px;
    height: 70px;
    pointer-events: none;
    border-color: transparent;
  }

  & > div {
    width: 90px;
    height: 90px;
    border: none;
    opacity: 0.575;
  }
`

export function Game() {
  const [board, setBoard] = useState(() => {
    const boardFromLocalStorage = window.localStorage.getItem('board')
    return boardFromLocalStorage
      ? JSON.parse(boardFromLocalStorage)
      : Array(9).fill(null)
  })

  const [turn, setTurn] = useState(() => {
    const turnFromLocalStorage = window.localStorage.getItem('turn')
    return turnFromLocalStorage ?? TURNS.X
  })

  // null es que no hay ganador, false es que hay un empate
  // const [winner, setWinner] = useState(null);
  const [winner, setWinner] = useState(() => {
    const winnerFromStorage = window.localStorage.getItem('winner')
    if (winnerFromStorage === 'null') return null
    return winnerFromStorage
  })

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)

    resetGameStorage()
  }

  const updateBoard = index => {
    // no actualizamos esta posición
    // si ya tiene algo
    if (board[index] || winner) return

    // actualizar el tablero
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    // cambiar el turno
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    // revisar si hay un ganador
    let newWinner = checkWinnerFrom(newBoard)
    if (newWinner) {
      confetti()
      setWinner(newWinner)
    } else if (checkEndGame(newBoard)) {
      setWinner(false) // empate
      newWinner = false
    }

    //guardar aqui partida
    saveGameToStorage({
      board: newBoard,
      turn: newTurn,
      winner: newWinner,
    })
  }

  return (
    <BoardContainer>
      <h1>Tic tac toe</h1>
      <Board board={board} updateBoard={updateBoard} />

      <Turn>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
      </Turn>

      <button onClick={resetGame}>Game reset</button>

      <WinnerModal winner={winner} resetGame={resetGame} />
    </BoardContainer>
  )
}
