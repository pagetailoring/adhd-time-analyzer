<script setup lang="ts">
const { data } = storeToRefs(useAnalyzerSummaryStore())

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))
</script>

<template>
  <v-card-text>
    <v-data-table
      density="compact"
      class="text-caption"
      hide-default-header
      hide-default-footer
      :items="data"
    >
      <template #item="{ item }">
        <tr>
          <td><v-badge :color="item.color" inline></v-badge></td>
          <td class="text-center">{{ item.label }}</td>
          <td class="text-center">{{ item.totalTime }}</td>
        </tr>
      </template>
    </v-data-table>
  </v-card-text>
</template>
