import type { FromLanguage, Language } from '../types'

import { SUPPORTED_LANGUAGES } from '../constants'

type Props = {
  fromLanguage: FromLanguage
  toLanguage: Language
  text: string
}

export async function translate({ fromLanguage, toLanguage, text }: Props) {
  if (fromLanguage === toLanguage)
    return text

  const fromCode
    = fromLanguage === 'auto' ? 'auto' : SUPPORTED_LANGUAGES[fromLanguage]
  const toCode = SUPPORTED_LANGUAGES[toLanguage]

  const res = await fetch(
    `https://translate-api-abrahamgalue.vercel.app/api/translate?text=${text}&from=${fromCode}&to=${toCode}`,
  )
  const data = await res.json()

  return data.translatedText
}
