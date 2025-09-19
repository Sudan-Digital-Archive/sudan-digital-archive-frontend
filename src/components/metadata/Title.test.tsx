import { Title } from './Title.tsx'
import { describe, it, expect } from 'vitest'
import {
  addi18n,
  renderWithProviders,
} from '../../../testUtils/testHelpers.tsx'
import { screen } from '@testing-library/react'

addi18n()
describe('Title', () => {
  const testTitle = 'Test Title'

  it('should render properly in English', () => {
    renderWithProviders(<Title title={testTitle} />)
    expect(screen.getByText('Title:')).toBeTruthy()
    expect(screen.getByText(testTitle)).toBeTruthy()
  })

  it('should render properly in Arabic', () => {
    renderWithProviders(<Title title={testTitle} />, { language: 'ar' })
    expect(screen.getByText('العنوان:')).toBeTruthy()
    expect(screen.getByText(testTitle)).toBeTruthy()
    expect(document.documentElement.dir).toBe('rtl')
  })
})
