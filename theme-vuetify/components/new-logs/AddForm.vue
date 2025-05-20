<script setup lang="ts">
const { useAnalyzerFormStore } = await import('ANALYZER_LAYER/stores/lazy/form')
const form = useAnalyzerFormStore()
const { activity, durationMinutes, tags, timeTags, trackTags, qualityRate, note } =
  storeToRefs(form)

// new set becous repetitions
const tagsSelect = Array.from(
  new Set([...activities, ...coding, ...work, ...life, ...homeStuff, ...sport, ...appetite])
)
const trackTagsSelect = Array.from(new Set([...toTrackProjects, ...toTrackWork, ...toTrackLife]))
const timeTagsSelect = Array.from(new Set([...timeManagement, ...quality]))

const addStore = useAnalyzerCreate()

const handleSubmit = async () => {
  const newLog = form.getNewTimeLog()

  newLog.tags = mergeTags([tags.value, timeTags.value, [newLog.act]], trackTags.value)
  await addStore.saveNew(newLog)
}

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))

onMounted(() => {
  console.log('MAIN_ACTIVITY_TAGS_FLAT', MAIN_ACTIVITY_TAGS_FLAT)
})
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <v-row class="d-flex">
      <v-col cols="12" sm="4">
        <UiSelect
          v-model="activity"
          icon="hugeicons:magic-wand-02"
          class="up"
          highlight
          :items="MAIN_ACTIVITY_TAGS_FLAT"
        />
      </v-col>

      <v-col cols="6" sm="2">
        <UiButton
          label="Save"
          variant="outlined"
          type="submit"
          class="fill-height w-100"
          append-icon="mdi-content-save"
        />
      </v-col>

      <v-col cols="6" sm="2">
        <UiSelect v-model="durationMinutes" :items="durations" />
      </v-col>

      <v-col cols="6" sm="4">
        <UiInput v-model="note" placeholder="info note..." />
      </v-col>

      <v-col cols="6" sm="3">
        <UiSelect
          v-model="qualityRate"
          value-key="val"
          :items="qltyRateSetlect"
          item-value="value"
          item-title="label"
        />
      </v-col>

      <v-col cols="12" sm="9">
        <UiCombobox v-model="tags" class="w-[calc(100%-2.5rem)]" :items="tagsSelect" />
        <UiTooltip text="Activities tags (long list), reseting to default on main type change">
        </UiTooltip>
      </v-col>

      <v-col cols="12" sm="8">
        <UiCombobox v-model="trackTags" :items="trackTagsSelect" />
      </v-col>

      <v-col cols="12" sm="4">
        <UiCombobox v-model="timeTags" :items="timeTagsSelect" />
      </v-col>
    </v-row>
  </form>
</template>
