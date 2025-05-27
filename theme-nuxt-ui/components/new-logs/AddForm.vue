<script setup lang="ts">
const { disabled = false } = defineProps<{
  disabled?: boolean
}>()

const { useAnalyzerFormStore } = await import('ANALYZER_LAYER/stores/lazy/form')
const form = useAnalyzerFormStore()
const { activity, durationMinutes, tags, timeTags, trackTags, qualityRate, note } =
  storeToRefs(form)

const trackTagsSelect = [toTrackProjects, toTrackWork, toTrackLife]
const timeTagsSelect = [timeManagement, quality, notesHelper]

// Submission logic
const addStore = useAnalyzerCreate()
const handleSubmit = async () => {
  const newLog = form.getNewTimeLog()
  newLog.tags = mergeTags([tags.value, timeTags.value, [newLog.act]], trackTags.value)
  await addStore.saveNew(newLog)
}

function resetArray<T>(field: Ref<T[]>) {
  field.value = []
}

const resetTrack = () => resetArray(trackTags)
const resetTime = () => resetArray(timeTags)

const content: TooltipContentConfig = { side: 'top' }

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))
</script>

<template>
  <ThemeCard :is-border="false">
    <form
      class="grid w-full grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8 xl:grid-cols-10"
      @submit.prevent="handleSubmit"
    >
      <UTooltip text="Main ativity type" :content>
        <UiSelect
          v-model="activity"
          icon="hugeicons:magic-wand-02"
          class="col-span-2 capitalize xl:col-span-2"
          highlight
          :items="MAIN_ACTIVITY_TAGS"
          :disabled
        />
      </UTooltip>

      <UTooltip text="Time in minutes" :content>
        <UiSelect
          v-model="durationMinutes"
          color="info"
          highlight
          icon="i-lucide-clock"
          :items="durations"
          :disabled
        />
      </UTooltip>

      <UiButton
        trailing-icon="hugeicons:floppy-disk"
        type="submit"
        color="primary"
        class="justify-center rounded-xl px-4 text-sm uppercase"
        label="Save new"
        :disabled
      />

      <UInput
        v-model="note"
        class="col-span-2 sm:col-span-1 lg:col-span-2"
        placeholder="info note..."
        :disabled
      />

      <UTooltip text="Quality Ratings activity" :content>
        <UiSelect
          v-model="qualityRate"
          icon="humbleicons:arrows-up-down"
          class="col-span-1 lg:col-span-2"
          value-key="val"
          :items="qltyRateSetlect"
          :disabled
        />
      </UTooltip>

      <UButtonGroup class="col-span-1 sm:col-span-2">
        <UTooltip text="Quality time ratings" :content>
          <UiSelectMenu
            v-model="timeTags"
            placeholder="Time Tags"
            icon="game-icons:melting-ice-cube"
            class="w-[calc(100%-2.5rem)]"
            multiple
            :items="timeTagsSelect"
            :disabled
          />
        </UTooltip>
        <UTooltip text="Reset field" :content>
          <UButton class="w-[2.5rem]" icon="arcticons:cleaner" :disabled @click="resetTime()" />
        </UTooltip>
      </UButtonGroup>

      <LazyNewLogsSelectTags :disabled class="col-span-2 lg:col-span-3 xl:col-span-6" />

      <UButtonGroup class="col-span-2 lg:col-span-3 xl:col-span-4">
        <UTooltip
          text="Activities tags (long list), reseted to default on main type change"
          :content
        >
          <UiSelectMenu
            v-model="trackTags"
            placeholder="Tags to track"
            icon="hugeicons:ai-brain-01"
            class="w-[calc(100%-2.5rem)]"
            multiple
            :items="trackTagsSelect"
            :disabled
          />
        </UTooltip>
        <UTooltip text="Reset field" :content>
          <UButton
            class="w-[2.5rem]"
            icon="arcticons:cleaner"
            :disabled
            @click="() => resetTrack()"
          />
        </UTooltip>
      </UButtonGroup>
    </form>
  </ThemeCard>
</template>
