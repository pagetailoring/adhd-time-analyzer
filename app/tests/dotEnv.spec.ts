// @vitest-environment nuxt
import { describe, test, expect } from 'vitest'
import type { Theme } from '../types/theme'
import { validThemes } from '../config.layers'

describe('process.env.UI_THEME validity', () => {
  test('USE_FIREBASE is defined', () => {
    expect(process.env.USE_FIREBASE).toBeDefined()
    expect(process.env.USE_FIREBASE === 'true' || process.env.USE_FIREBASE === 'false').toBeTruthy()
  })

  test('UI_THEME is defined', () => {
    expect(process.env.UI_THEME).toBeDefined()
  })

  test('UI_THEME value is valid Theme', () => {
    expect(validThemes).toContain(process.env.UI_THEME as Theme)
  })
})
