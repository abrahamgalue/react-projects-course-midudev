import { useState, useEffect } from 'react'
import { getRandomFact } from "../services/facts"

export function useCatFact() {
  // ❌ Bad practice (useCatFetch, useFetchFact): avoid giving it the name of the implementation inside
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact))
  }

  // para recuperar la cita al cargar la página
  useEffect(refreshFact, [])

  return { fact, refreshFact }
}