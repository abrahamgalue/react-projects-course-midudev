import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => void
  selectAwswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
}

export const useQuestionsStore = create<State>((set, get) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async limit => {
    const res = await fetch('http://localhost:5173/data.json')
    const json = await res.json()

    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)

    set({ questions })
  },
  selectAwswer: (questionId: number, answerIndex: number) => {
    const { questions } = get()
    // usamos StructureClone para clonar objetos de manera profunda
    const newQuestions = structuredClone(questions)
    // encontramos el indice de esa pregunta que es usuario selecciono
    const questionIndex = newQuestions.findIndex(q => q.id === questionId)
    // obtemenos esa pregunta del objeto que clonamos
    const questionInfo = newQuestions[questionIndex]
    // verificamos si la respuesta del usuario es la correcta
    const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
    // cambiamos esa información en la copia de la pregunta original

    if (isCorrectUserAnswer) confetti()

    newQuestions[questionIndex] = {
      ...questionInfo,
      isCorrectUserAnswer,
      userSelectedAnswer: answerIndex,
    }

    // actualizamos el estado
    set({
      questions: newQuestions,
    })
  },
  goNextQuestion: () => {
    const { currentQuestion, questions } = get()
    const nextQuestion = currentQuestion + 1

    if (nextQuestion < questions.length) {
      set({
        currentQuestion: nextQuestion,
      })
    }
  },
  goPreviousQuestion: () => {
    const { currentQuestion } = get()
    const previousQuestion = currentQuestion - 1

    if (previousQuestion >= 0) {
      set({
        currentQuestion: previousQuestion,
      })
    }
  },
}))
