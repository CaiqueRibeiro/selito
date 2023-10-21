import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SuccessOrErrorIndicator } from '../../components/SuccessOrErrorIndicator'

describe('SuccessOrErrorIndicator test', () => {
  it('should show title', () => {
    render(<SuccessOrErrorIndicator success={true} />)

    const mainElement = screen.getByRole('main')

    expect(mainElement).toBeDefined()
    expect(mainElement.childElementCount).toBe(1)
  })
})