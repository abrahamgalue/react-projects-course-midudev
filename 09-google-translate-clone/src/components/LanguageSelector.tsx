import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { FC, ChangeEvent } from 'react'
import { type FromLanguage, type Language, SectionType } from '../types.d'

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
      aria-label='Selecciona el idioma'
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
