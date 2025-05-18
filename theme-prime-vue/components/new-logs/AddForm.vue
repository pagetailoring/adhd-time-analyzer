<script setup lang="ts">
// Store and refs
const { useAnalyzerFormStore } = await import('ANALYZER_LAYER/stores/lazy/form')
const form = useAnalyzerFormStore()
const { activity, durationMinutes, tags, timeTags, trackTags, qualityRate, note } =
  storeToRefs(form)

const activityModel = computed<SelectOption<string>>({
  get: () => convertToSelectOption(activity.value),
  set(options) {
    console.log(options)
    activity.value = options.value
  },
})
const qualityRateModel = computed<SelectOption<number>>({
  get: () => convertToSelectOption(qualityRate.value),
  set(options) {
    console.log(options)
    qualityRate.value = options.value
  },
})
const durationMinutesModel = computed<SelectOption<number>>({
  get: () => convertToSelectOption(durationMinutes.value),
  set(options) {
    console.log(options)
    durationMinutes.value = options.value
  },
})
const timeTagsModel = computed<SelectOption<string>[]>({
  get: () => convertToSelectOptions(timeTags.value),
  set(options) {
    console.log(options)
    timeTags.value = convertToRawData(options)
  },
})
const trackTagsModel = computed<SelectOption<string>[]>({
  get: () => convertToSelectOptions(trackTags.value),
  set(options) {
    console.log(options)
    trackTags.value = convertToRawData(options)
  },
})
const tagsModel = computed<SelectOption<string>[]>({
  get: () => convertToSelectOptions(tags.value),
  set(options) {
    console.log(options)
    tags.value = convertToRawData(options)
  },
})

// Tag options
const tagsSelect = [activities, coding, work, life, homeStuff, sport, appetite].flat()
const trackTagsSelect = [toTrackProjects, toTrackWork, toTrackLife].flat()
const timeTagsSelect = [timeManagement, quality].flat()

// Submission logic
const addStore = useAnalyzerCreate()
const handleSubmit = async () => {
  const newLog = form.getNewTimeLog()

  newLog.tags = mergeTags([tags.value, timeTags.value, [newLog.act]], trackTags.value)
  await addStore.saveNew(newLog)
}

// Reset helpers
function resetArray<T>(field: Ref<T[]>) {
  field.value = []
}

const resetTags = () => form.resetTags()
const resetTrack = () => resetArray(trackTags)
const resetTime = () => resetArray(timeTags)
</script>

<template>
  <form class="grid" @submit.prevent="handleSubmit">
    <InputGroup>
      <Select
        v-model="activityModel"
        :options="convertToSelectOptions(mainActivityTags.flat())"
        option-label="label"
        placeholder="Select Activity"
        input-id="activity"
        class="w-full"
      />
    </InputGroup>

    <InputGroup class="narrow">
      <Select
        v-model="durationMinutesModel"
        :options="convertToSelectOptions(durations)"
        option-label="label"
        placeholder="Select Duration"
        input-id="duration"
        class="w-full"
      />
    </InputGroup>

    <InputGroup class="narrow w-full">
      <UiButton type="submit" label="Save New" icon="pi pi-save" style="width: 100%" />
    </InputGroup>

    <InputGroup class="col-span-2 sm:col-span-1 lg:col-span-2">
      <InputText v-model="note" placeholder="Info note..." input-id="note" class="w-full" />
    </InputGroup>

    <InputGroup class="wider">
      <MultiSelect
        v-model="tagsModel"
        :options="convertToSelectOptions(tagsSelect)"
        option-label="label"
        placeholder="Select Tags"
        input-id="tags"
        class="w-full"
        display="chip"
        filter
      />
      <UiButton icon="pi pi-refresh" @click="resetTags" />
    </InputGroup>

    <InputGroup>
      <Select
        v-model="qualityRateModel"
        :options="qltyRateSetlect"
        option-label="label"
        placeholder="Select Quality"
        input-id="qualityRate"
        class="w-full"
      />
    </InputGroup>

    <InputGroup class="wide">
      <MultiSelect
        v-model="timeTagsModel"
        :options="convertToSelectOptions(timeTagsSelect)"
        option-label="label"
        placeholder="Select Time Tags"
        input-id="timeTags"
        class="w-full"
        display="chip"
        filter
      />
      <UiButton icon="pi pi-times" @click="resetTime" />
    </InputGroup>

    <InputGroup class="wide">
      <MultiSelect
        v-model="trackTagsModel"
        :options="convertToSelectOptions(trackTagsSelect)"
        option-label="label"
        placeholder="Select Track Tags"
        input-id="trackTags"
        display="chip"
        filter
      />
      <UiButton icon="pi pi-times" @click="resetTrack" />
    </InputGroup>
  </form>
</template>
