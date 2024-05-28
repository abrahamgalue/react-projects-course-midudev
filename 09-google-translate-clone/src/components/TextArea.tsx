import { Form } from 'react-bootstrap'
import { FC } from 'react'
import { SectionType } from '../types.d'

interface Props {
  type: SectionType
  loading?: boolean
  value: string
  onChange: (value: string) => void
}

const commonStyles = {
  border: 0,
  height: '200px',
  width: '300px',
  resize: 'none',
}

export const TextArea: FC<Props> = ({ loading, value, onChange, type }) => {
  const styles = commonStyles
  return (
    <Form.Control
      autoFocus={type === SectionType.From}
      disabled={type === SectionType.To}
      as='textarea'
      placeholder={type === SectionType.From ? 'Ingresar texto' : 'Traducción'}
      style={styles}
    />
  )
}
