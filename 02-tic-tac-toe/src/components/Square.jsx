import styled from 'styled-components'

const SquareContainer = styled.div`
  width: 100px;
  height: 100px;
  border: 4px solid #0da192;
  display: grid;
  place-items: center;
  cursor: pointer;
  font-size: 48px;
  user-select: none;

  &:nth-child(1),
  :nth-child(2),
  :nth-child(3) {
    border-top: none;
  }

  &:nth-child(1),
  :nth-child(4),
  :nth-child(7) {
    border-left: none;
  }

  &:nth-child(3),
  :nth-child(6),
  :nth-child(9) {
    border-right: none;
  }

  &:nth-child(7),
  :nth-child(8),
  :nth-child(9) {
    border-bottom: none;
  }

  &.is-selected {
    color: #fff;
    border-radius: 12px;
    border-bottom: 3px solid #f2ebd3;
    opacity: 1;
  }
`

export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `${isSelected ? 'is-selected' : ''}`

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <>
      <SquareContainer onClick={handleClick} className={className}>
        {children}
      </SquareContainer>
    </>
  )
}
