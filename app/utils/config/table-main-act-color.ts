const arr = ['coding', 'planning', 'work others', 'test', 'work']
const info = arr.concat(toTrackWork, toTrackProjects, quality)

const sc = ['rest', 'life', 'cleaning', 'relax', 'sport', 'eat', 'self care']
const success = sc.concat(homeStuff)

const warning = ['chaos', 'rabbit hole']
const error = ['drift away', 'get stuck']

export function getActColor(act: string): NuxtUiColor {
  // @fixme @dict after normalizing evrything remove to lower case
  const type = act ? act.toLowerCase() : 'life'

  return type
    ? success.includes(type)
      ? 'success'
      : info.includes(type)
        ? 'info'
        : warning.includes(type)
          ? 'warning'
          : error.includes(type)
            ? 'error'
            : 'neutral'
    : 'neutral'
}

/**
 * @see /types/nuxtUi -> NuxtUiColor
 *
 * ⭐️ type AppConfigUI.colors?: {
 *      'primary'?: Color
 *      'secondary'?: Color
 *      'success'?: Color
 *      'info'?: Color
 *      'warning'?: Color
 *      'error'?: Color
 *      neutral?: NeutralColor
 *    }
 *    ....
 *  } & DeepPartial<typeof ui>
 *
 *
 * @see /.nuxt/types/ui.d.ts
 */
