import type { ChangeEvent, FC } from 'react'

import { Form } from 'react-bootstrap'

import type { FromLanguage, Language } from '../types.d'

import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { SectionType } from '../types.d'

type Props =
  | {
    type: SectionType.From
    value: FromLanguage
    onChange: (language: FromLanguage) => void
  }
  | {
    type: SectionType.To
    value: Language
    onChange: (language: Language) => void
  }

export const LanguageSelector: FC<Props> = ({ onChange, type, value }) => {
  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language)
  }

  return (
    <Form.Select
      aria-label="Selecciona el idioma"
      value={value}
      onChange={handleChange}
    >
      {type === SectionType.From && (
        <option value={AUTO_LANGUAGE}>Detectar idioma</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, value]) => (
        <option key={key} value={key}>
          {value}
        </option>
      ))}
    </Form.Select>
  )
}
