import { useSyncExternalStore } from 'react'

export const SCREEN_BREAK_POINT = 800

function windowWidth (callback) {
  window.addEventListener('resize', callback)

  return () => window.removeEventListener('resize', callback)
}

export function useWindowWidth() {

  return useSyncExternalStore(windowWidth, () => window.innerWidth)
}
