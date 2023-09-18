import { Filters } from './Filters.jsx'
import { HeaderIcon } from './Icons.jsx'

const styles = {
  header: {
    userSelect: 'none',
  },
}

export function Header() {
  return (
    <header>
      <h1 style={styles.header}>Shopping Cart {<HeaderIcon />}</h1>
      <Filters />
    </header>
  )
}
