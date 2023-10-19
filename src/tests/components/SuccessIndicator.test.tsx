import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SuccessIndicator } from '../../components/SuccessIndicator'

describe('SuccessIndicator test', () => {
  it('should show title', () => {
    render(<SuccessIndicator />)

    const mainElement = screen.getByRole('main')

    expect(mainElement).toBeDefined()
    expect(mainElement.childElementCount).toBe(1)
  })
})