import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SuccessIndicator } from '../../components/SuccessIndicator'

describe('SuccessIndicator test', () => {
  it('should show title', () => {
    render(<SuccessIndicator />)

    expect(screen.getByRole('main')).toBeDefined()
  })
})