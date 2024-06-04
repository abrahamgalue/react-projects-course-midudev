import { StyledHeader, StyledTitle } from './Header.styled.jsx'
import { HeaderIcon } from './Icons.jsx'
import { Filters } from './Filters.jsx'

export function Header() {
  return (
    <StyledHeader>
      <StyledTitle>Shopping Cart {<HeaderIcon />}</StyledTitle>
      <Filters />
    </StyledHeader>
  )
}
