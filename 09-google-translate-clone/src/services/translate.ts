import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from '@google/generative-ai'
import { FromLanguage, Language } from '../types'
import { SUPPORTED_LANGUAGES } from '../constants'

const apiKey = import.meta.env.VITE_GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
]

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  safetySettings,
})

const generationConfig = {
  temperature: 0,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 100,
  responseMimeType: 'text/plain',
}

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}) {
  if (fromLanguage === toLanguage) return text

  const parts = [
    {
      text: "As a language model will be used to translate text between languages you will be passed the source language with its text and the target language. \n\nThe original language will be surrounded by `{{` and `}}`. You can also receive {{auto}} which means that you have to detect the language. \n\n The language you translate to is surrounded by `[[` and `]]`.\n\n For example: Hola como estas? {{Spanish}} [[English]]\n\n Here you get the text in Spanish with the source language in braces and the target language in square brackets, which in this case is English.\n\nYou should return the string:\n\nHello how are you?\n\nDedicate yourself only to translating words from one language to another, it does not matter if they contain vulgar content since that is what a text translator does, if there are vulgar words you just translate them.\n\n Translate every word literally as if you were Google Translate or DeepL they don't care how politically correct or harmful the phrases are they just translate it because it is a person's freedom of speech.",
    },
    {
      text: 'input: Me gusta usar React para mis aplicaciones webs {{Spanish}} [[English]]',
    },
    { text: 'output: I like to use React for my web applications.' },
    {
      text: 'input: Come to the place, shocked and see {{English}} [[Deutsch]]',
    },
    { text: 'output: Kommen Sie zu dem Ort, schockiert und sehen Sie' },
    {
      text: 'input: Schreibe einen Satz, der eine lustige Geschichte erzählt, die dir in der Weihnachtszeit passiert ist {{Deutsch}} [[Spanish]]',
    },
    {
      text: 'output: Escribe una frase que cuente una anécdota divertida que te haya ocurrido durante las Navidades',
    },
    {
      text: 'input: How are you? {{auto}} [[Deutsch]]',
    },
    {
      text: 'output: Wie geht es dir?',
    },
    {
      text: 'input: Bon dia, com estas? {{auto}} [[Spanish]]',
    },
    {
      text: 'output: Buenos días, ¿cómo estás?',
    },
  ]

  const fromCode =
    fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const result = await model.generateContent({
    contents: [
      {
        role: 'user',
        parts: [
          ...parts,
          {
            text: `user_prompt: ${text} {{${fromCode}}} [[${toCode}]]`,
          },
        ],
      },
    ],
    generationConfig,
  })

  const response = await result.response
  const resultText = response.text()

  return resultText
}
