import { DateMetadata } from './DateMetadata.tsx'
import { describe, it, expect } from 'vitest'
import {
  addi18n,
  renderWithProviders,
} from '../../../testUtils/testHelpers.tsx'
import { screen } from '@testing-library/react'

addi18n()
describe('DateMetadata', () => {
  const testDate = '2023-01-01'

  it('should render properly in English', () => {
    renderWithProviders(<DateMetadata date={testDate} />)
    expect(screen.getByText('Date:')).toBeTruthy()
    expect(screen.getByText('January 1, 2023')).toBeTruthy()
  })

  it('should render properly in Arabic', () => {
    renderWithProviders(<DateMetadata date={testDate} />, { language: 'ar' })
    expect(screen.getByText('التاريخ:')).toBeTruthy()
    expect(screen.getByText('١ يناير ٢٠٢٣')).toBeTruthy()
    expect(document.documentElement.dir).toBe('rtl')
  })

  it('should handle invalid date', () => {
    renderWithProviders(<DateMetadata date="invalid-date" fontSize="lg" />, {
      language: 'en',
    })
    expect(screen.getByText('Date:')).toBeTruthy()
    expect(screen.queryByText(/invalid-date/)).toBeFalsy()
  })

  it('should handle API date format without timezone as UTC (regression #65)', () => {
    // 2026-01-09T00:29:48.332199 should be treated as UTC, so Jan 9.
    // We want to ensure it stays Jan 9.
    renderWithProviders(<DateMetadata date="2026-01-09T00:29:48.332199" />)
    expect(screen.getByText('January 9, 2026')).toBeTruthy()
  })
  it('should handle API date format without timezone as UTC (regression #65) no ms', () => {
    // 2026-01-09T00:29:48.332199 should be treated as UTC, so Jan 9.
    // We want to ensure it stays Jan 9.
    renderWithProviders(<DateMetadata date="2026-01-09T00:00:00" />)
    expect(screen.getByText('January 9, 2026')).toBeTruthy()
  })
})
