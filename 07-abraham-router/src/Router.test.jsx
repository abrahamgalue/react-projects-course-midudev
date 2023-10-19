import { describe, it, expect } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { Router } from './Router'
import { beforeEach } from 'vitest'

describe('Router', () => {
  beforeEach(() => {
    cleanup()
  })

  it('should render without problems', () => {
    render(<Router routes={[]} />)
    expect(true).toBeTruthy()
  })

  it('should render 404 if no routes match', () => {
    render(<Router routes={[]} defaultComponent={() => <h1>404</h1>} />)
    expect(screen.getByText('404')).toBeTruthy()
  })
})
