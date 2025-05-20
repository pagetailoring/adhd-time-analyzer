// type noopColors = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error' | 'neutral'
// export type UiColors = typeof UI_THEME extends 'nuxt-ui' ? NuxtUiColor : noopColors

export type UiColors =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'info'
  | 'warning'
  | 'error'
  | 'neutral'

export type ColorKey = Partial<UiColors>

export type GroupMap = Record<ColorKey, TimeLogTag[]>
