declare module '@nuxt/schema' {
  interface AppConfigInput {
    /** Project name */
    myLayer?: { name?: string }
  }
}

export default defineAppConfig({
  myLayer: { name: 'theme-nuxt-ui' },
  ui: {
    colors: {
      primary: 'emerald',
      secondary: 'fuchsia',
    },
    table: {
      slots: {
        th: 'px-2 uppercase text-xs tracking-widest py-3 text-left rtl:text-right [&:has([role=checkbox])]:pe-0',
        td: '[&:has(.log)]:w-10 w-fit [&:has(.log)]:text-center p-2 text-sm text-(--ui-text-muted) whitespace-nowrap [&:has([role=checkbox])]:pe-0',
      },
    },
    button: {
      defaultVariants: {
        color: 'neutral',
        variant: 'subtle',
        size: 'xl',
      },
    },
    badge: {
      slots: {
        base: 'font-medium inline-flex items-center whitespace-normal',
      },
      defaultVariants: {
        color: 'info',
        variant: 'subtle',
        size: 'lg',
      },
    },
    input: {
      defaultVariants: {
        size: 'xl',
      },
    },
    selectMenu: {
      slots: {
        content: [
          'relative group rounded-xl inline-flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75',
          'max-h-150 h-[clamp(auto,150rem,50vh)] w-(--reka-select-trigger-width)',
          'transition-colors',
        ],
      },
    },

    select: {
      defaultVariants: {
        size: 'xl',
      },
      slots: {
        content:
          'max-h-150 h-[clamp(auto,180rem,60vh)] w-(--reka-select-trigger-width) bg-default shadow-lg rounded-md ring ring-default overflow-hidden data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-select-content-transform-origin) pointer-events-auto',
      },
    },
    toast: {
      defaultVariants: {
        color: 'info',
      },
    },
  },
})
