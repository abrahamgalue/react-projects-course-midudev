import './App.css'
import { useCatImage } from './hooks/useCatImage'
import { useCatFact } from './hooks/useCatFact'
import Container from './Components/Container'
import Title from './Components/Title'
import Button from './Components/Button'
import Image from './Components/Image'

export function App() {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })
  const handleClick = async () => {
    refreshFact()
  }

  return (
    <Container>
      <Title>App de gatitos</Title>
      <Button onClick={handleClick}>Get new fact</Button>
      {/* <section> */}
      {fact && <p>{fact}</p>} {/* Renderizado condicional */}
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={`Image extracted using the first three words for ${fact}`}
        />
      )}
      {/* </section> */}
    </Container>
  )
}
