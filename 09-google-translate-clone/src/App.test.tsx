import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test } from 'vitest'

import App from './App'

test('should works as expected', async () => {
  const user = userEvent.setup()
  const app = render(<App />)

  const textareFrom = app.getByPlaceholderText('Introducir texto')

  await user.type(textareFrom, 'Hola mundo')
  const result = await app.findByDisplayValue(
    /Hello world/i,
    {},
    { timeout: 3500 },
  )
  expect(result).toBeTruthy()
})
