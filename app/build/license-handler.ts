import { resolve, dirname } from 'node:path'
import fs from 'fs-extra'
import license from 'rollup-plugin-license'

const LICENSE_FILE = resolve(__dirname, '../LICENSES.txt')
const PUBLIC_LICENSE_FILE = resolve(__dirname, '../public/LICENSES.txt')

export function getLicensePlugin() {
  return license({
    banner: undefined,
    thirdParty: {
      includePrivate: true,
      output: LICENSE_FILE,
    },
  })
}

export async function moveLicenseFile(isDevelopment: boolean) {
  if (isDevelopment) return

  if (await fs.pathExists(LICENSE_FILE)) {
    await fs.ensureDir(dirname(PUBLIC_LICENSE_FILE))
    await fs.move(LICENSE_FILE, PUBLIC_LICENSE_FILE, { overwrite: true })
    console.log('\n\n\n✅ LICENSES.txt moved to public/\n\n\n')
  } else {
    console.warn('\n\n\n❌ LICENSES.txt not found!\n\n\n')
  }
}
