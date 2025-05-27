<script setup lang="ts">
const { timeLogsToDisplay } = storeToRefs(useAnalyzerViewStore())

// @todo change timeLogsToDisplay to arrayToDisplay: data, remove data logic (watch)

const data = ref<TimeLog[]>([])
watch(
  timeLogsToDisplay,
  async () => {
    await nextTick()
    data.value = timeLogsToDisplay.value
  },
  { immediate: true, flush: 'post' }
)

const itemsPerPage = ref(30)
const page = ref(1)
const pageCount = computed(() => {
  return Math.ceil(data.value.length / itemsPerPage.value)
})

const headers: DataTableHeader = [
  { title: 'PMDRO', key: 'sort', align: 'center' },
  { title: 'MAIN', key: 'act', align: 'center' },
  { title: 'TAGS', key: 'list' },
]

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))
</script>

<template>
  <v-row>
    <v-col cols="12">
      <v-card>
        <v-card-text class="">
          <v-data-table :headers class="text-caption text-uppercase" :items="data">
            <template #item="{ item }">
              <tr>
                <td class="text-center">
                  <span>{{ item.dur }}</span>
                  <span class="text-lowercase"> min.</span>
                </td>
                <td>
                  <v-chip variant="tonal" :color="getActTagColor(item.act)" size="small">
                    {{ item.act }}
                  </v-chip>
                </td>
                <td>
                  <div class="d-flex ga-1">
                    <v-chip
                      v-for="(tag, idx) in item.tags"
                      :key="idx"
                      :color="getActTagColor(tag)"
                      variant="tonal"
                      size="x-small"
                      class="m-1"
                    >
                      {{ tag }}
                    </v-chip>
                  </div>
                </td>
              </tr>
            </template>
            <template #bottom>
              <div v-if="pageCount > 1" class="text-center pt-2">
                <v-pagination v-model="page" :length="pageCount"></v-pagination>
              </div>
            </template>
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
