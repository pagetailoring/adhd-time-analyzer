// @vitest-environment nuxt
import { describe, it, expect } from 'vitest'
import { getThemeKey } from '../../build/theme-key'
import { validThemes } from '../../config.layers'

it('Test runs')

describe('getThemeKey()', () => {
  it('returns the theme when UI_THEME is valid', () => {
    for (const theme of validThemes) {
      process.env.UI_THEME = theme
      expect(getThemeKey()).toBe(theme)
    }
  })

  it('returns "noop" when UI_THEME is missing or invalid', () => {
    delete process.env.UI_THEME
    expect(getThemeKey()).toBe('noop')
    process.env.UI_THEME = 'invalid'
    expect(getThemeKey()).toBe('noop')
  })

  it('returns correct values when UI_THEME changes', () => {
    process.env.UI_THEME = 'vuetify'
    expect(getThemeKey()).toBe('vuetify')
    process.env.UI_THEME = 'foo'
    expect(getThemeKey()).toBe('noop')
  })
})
