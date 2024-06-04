import { useState, useEffect } from 'react'

const SCREEN_BREAK_POINT = 615

export function useScreenSize() {
  const [size, setSize] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setSize(window.innerWidth)
    }

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return { size, SCREEN_BREAK_POINT }
}
