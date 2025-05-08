<script lang="ts" setup>
interface PublicRuntimeConfig {
  DOMAIN?: string
}

interface RuntimeConfig {
  public: PublicRuntimeConfig
}

onMounted(() => {
  const rc = useRuntimeConfig() as RuntimeConfig
  const domain = rc.public.DOMAIN ?? ''

  console.log(`\nLegal notices for app dependencies can be found at: ${domain}/LICENSES.txt\n\n`)
  console.log('\n\n🪡 Page tailor made by https://pageTailoring.com 🪡\n\n\n')
})
</script>

<template>
  <div></div>
</template>
