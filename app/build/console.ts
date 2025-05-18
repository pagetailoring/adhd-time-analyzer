import { validThemes } from '../config.layers'

export function logBuildInfoWithComment(themeKey: string) {
  // Console logs to verify build config state
  console.log('✅', 'Main Application Entry Layer, built with .env:')
  console.log('⚙️', ' USE_FIREBASE: boolean ===', process.env.USE_FIREBASE === 'true')
  console.log('⚙️', ' UI_THEME:', themeKey, 'as Theme[]: ', validThemes, '')
}
