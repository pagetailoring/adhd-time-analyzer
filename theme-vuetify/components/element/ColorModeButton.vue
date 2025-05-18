<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.name.value === 'dark' ? 'light' : 'dark'
}
</script>

<template>
  <v-btn
    icon
    :title="`Switch to ${theme.global.name.value === 'dark' ? 'light' : 'dark'} mode`"
    @click="toggleTheme"
  >
    <v-icon>
      {{ theme.global.name.value === 'dark' ? 'mdi-weather-sunny' : 'mdi-moon-waxing-crescent' }}
    </v-icon>
  </v-btn>
</template>
