import { Badge, Button, Card, TextInput, Title } from '@tremor/react'
import { FormEvent, useState } from 'react'
import { useUserAction } from '../hooks/useUserActions'

export function CreateNewUser() {
  const { addUser } = useUserAction()
  const [result, setResult] = useState<'ok' | 'ko' | null>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResult(null)

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const github = formData.get('github') as string

    if (!name || !email || !github) {
      // Hacemos las validaciones que nosotros queramos
      // Al momento que el usuario envia el formulario
      return setResult('ko')
    }

    addUser({ name, email, github })
    setResult('ok')
    form.reset()
  }

  return (
    <Card style={{ marginTop: '16px' }}>
      <Title>New user</Title>

      <form onSubmit={handleSubmit}>
        <TextInput name='name' placeholder='Aquí el nombre' />
        <TextInput name='email' placeholder='Aquí el email' />
        <TextInput name='github' placeholder='aquí el usuario de github' />

        <div>
          <Button type='submit' style={{ marginTop: '16px' }}>
            Crear usuario
          </Button>
          <span>
            {result === 'ok' && (
              <Badge color='green'>Guardado correctamente</Badge>
            )}
            {result === 'ko' && <Badge color='red'>Error con los campos</Badge>}
          </span>
        </div>
      </form>
    </Card>
  )
}
