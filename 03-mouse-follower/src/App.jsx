import { useEffect, useState } from 'react'
import FollowMouseCursor from './Pointer.styled'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  // pointer move
  useEffect(() => {
    const handleMove = event => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // getEventListeners(window) ← para saber cuantos eventos se han susbcrito
    // cleanup
    // → cuando canbian las dependencias, antes de ejecutar
    // → cuando el componente se desmonta
    // el efecto de nuevo
    return () => {
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  // [] → solo se ejecuta una vez cuando se monta el componente
  // [enabled, ...] → se ejecuta cuando cambia enabled y cuando se monta el componente
  // undefined → se ejecuta cada vez que se renderiza el componente

  // change body className
  useEffect(() => {
    document.body.classList.toggle('no-cursor', enabled)

    return () => {
      // cleanup method
      document.body.classList.remove('no-cursor')
    }
  }, [enabled])

  return (
    <>
      <FollowMouseCursor position={position} />
      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Disable' : 'Enable'} follow pointer
      </button>
    </>
  )
}

function App() {
  return (
    <main>
      <FollowMouse />
    </main>
  )
}

export default App
