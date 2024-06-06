import { Form } from 'react-bootstrap'
import { CSSProperties, ChangeEvent, FC } from 'react'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  value: string
  onChange: (value: string) => void
}

const commonStyles: CSSProperties = {
  border: 0,
  height: '200px',
  width: '300px',
  resize: 'none',
}

const getPlaceholder = ({
  type,
  loading,
}: {
  type: SectionType
  loading?: boolean
}) => {
  if (type === SectionType.From) return 'Introducir texto'
  if (loading === true) return 'Cargando...'
  return 'Traducción'
}

export const TextArea: FC<Props> = ({ loading, value, onChange, type }) => {
  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      as='textarea'
      disabled={type === SectionType.To}
      placeholder={getPlaceholder({ type, loading })}
      style={commonStyles}
      value={value}
      onChange={handleChange}
    />
  )
}
