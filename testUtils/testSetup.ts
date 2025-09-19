import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

export const cleanUpAfterEach = afterEach(async () => {
  await cleanup()
})
