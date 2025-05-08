import { resolve, dirname } from 'node:path'
import license from 'rollup-plugin-license'
import fs from 'fs-extra'

// Absolute path for the temporary license file
const LICENSE_FILE = resolve(__dirname, 'LICENSES.txt')
// Absolute path for the final public license file
const PUBLIC_LICENSE_FILE = resolve(__dirname, 'public/LICENSES.txt')

function getStyles() {
  const styles = ['~/assets/styles/main.css']
  const devStyles = ['~/assets/styles/dev.css']
  return process.env.NODE_ENV === 'development' ? styles.concat(devStyles) : styles
}

function getModules() {
  const modules = [
    '@nuxtjs/html-validator',
    '@nuxt/eslint',

    '@nuxt/ui',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    'pinia-plugin-persistedstate/nuxt',
  ]
  // capo during development kills readability of console // conflict with Nuxt Ui /icons const noInDevModules = ['nuxt-payload-analyzer', 'nuxt-capo']
  const noInDevModules = ['nuxt-payload-analyzer']

  return process.env.NODE_ENV === 'development' ? modules : modules.concat(noInDevModules)
}

console.log('\n\n💡', 'Main Application Entry Layer, built with Nuxt UI components')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: [
    process.env.USE_FIREBASE === 'true' ? '../firebase' : '../noop',
    // @fixme @todo --- problem with pnpm cache
    '../analyzer',
  ],

  modules: getModules(),
  ssr: false,
  imports: { dirs: ['composables/app', 'types', 'utils', 'utils/config'] },
  devtools: { enabled: true },

  app: {
    head: {
      htmlAttrs: { lang: 'en', style: 'color-scheme: dark;' },
      bodyAttrs: { style: 'background: #0F172C;' },
      title: 'ADHD App',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width,initial-scale=1' },
        { name: 'description', content: 'Time analizer' },
      ],
    },
  },

  css: getStyles(),
  runtimeConfig: {
    public: {
      DOMAIN: process.env.DOMAIN,
      IS_DEMO_PAGE: process.env.DEMO === 'true', // to hide DEV buttons etc.
    },
  },

  compatibilityDate: '2024-11-01',

  vite: {
    // https://esbuild.github.io/api/#legal-comments
    esbuild: { legalComments: 'none' },
    build: {
      rollupOptions: {
        plugins: [
          license({
            banner: undefined, // Do not insert license banner into the bundle
            thirdParty: {
              includePrivate: true, // Include private packages as well
              output: LICENSE_FILE, // Generate the license file at the project root
            },
          }),
        ],
      },
    },
  },

  typescript: { typeCheck: true, strict: true },

  hooks: {
    'prerender:routes'({ routes }) {
      routes.clear() // Do not generate any routes (except the defaults)
    },
    // After the build process completes
    'build:done': async () => {
      if (process.env.NODE_ENV !== 'development') {
        // Check if the license file was generated
        if (await fs.pathExists(LICENSE_FILE)) {
          // Ensure the public directory exists
          await fs.ensureDir(dirname(PUBLIC_LICENSE_FILE))
          // Move the license file into the public directory
          await fs.move(LICENSE_FILE, PUBLIC_LICENSE_FILE, { overwrite: true })
          console.log('\n\n\n✅ LICENSES.txt moved to public/\n\n\n')
        } else {
          console.warn('\n\n\n❌ LICENSES.txt not found!\n\n\n')
        }
      }
    },
  },

  eslint: { config: { stylistic: true } },
  piniaPluginPersistedstate: { storage: 'localStorage', debug: true },
})
