<script setup lang="ts">
const { timeLogsToDisplay } = storeToRefs(useAnalyzerViewStore())

// // @test: experimental approach for delaying table rendering
// // @idea: maybe move pushLogic here to have faster count of statystics
// //        what would be more consistent and UI-agnostic
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
  // { title: 'POMODORO', key: 'dur', align: 'center' },
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
                  <v-chip size="small">{{ item.act }}</v-chip>
                </td>
                <td>
                  <v-chip-group column>
                    <v-chip v-for="(tag, idx) in item.tags" :key="idx" size="x-small">
                      {{ tag }}
                    </v-chip>
                  </v-chip-group>
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

<!-- row table for tests -->
<!-- <v-row>
    <v-col cols="12"> </v-col>
    <v-card-text>
      <v-data-table class="text-caption" :items="timeLogsToDisplay" />
    </v-card-text>
  </v-row> -->
