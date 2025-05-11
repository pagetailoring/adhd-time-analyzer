<script setup lang="ts">
const { useAnalyzerFormStore } = await import('analyzer/stores/lazy/form')
const form = useAnalyzerFormStore()
const { activity, durationMinutes, tags, timeTags, trackTags, qualityRate, note } =
  storeToRefs(form)

const tagsSelect = [activities, coding, work, life, homeStuff, sport, appetite]
const trackTagsSelect = [toTrackProjects, toTrackWork, toTrackLife]
const timeTagsSelect = [timeManagement, quality]

const addStore = useAnalyzerCreate()
const { merge } = useTagsMerge()
const handleSubmit = async () => {
  const newLog = form.getNewTimeLog()
  merge(tags, timeTags, trackTags)
  newLog.tags = tags.value
  await addStore.saveNew(newLog)
}

function resetArray<T>(field: Ref<T[]>) {
  field.value = []
}

const resetTags = () => form.resetTags()
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
        <ThemeSelect
          v-model="activity"
          icon="hugeicons:magic-wand-02"
          class="col-span-2 xl:col-span-2 capitalize"
          highlight
          :items="mainActivityTags"
        />
      </UTooltip>

      <UTooltip text="Time in minutes" :content>
        <ThemeSelect
          v-model="durationMinutes"
          color="info"
          highlight
          icon="i-lucide-clock"
          :items="durations"
        />
      </UTooltip>

      <UButton
        trailing-icon="hugeicons:floppy-disk"
        type="submit"
        color="primary"
        class="justify-center uppercase text-sm rounded-xl px-4"
        label="Save new"
      />

      <UInput
        v-model="note"
        class="col-span-2 sm:col-span-1 lg:col-span-2"
        placeholder="info note..."
      />

      <UTooltip text="Quality Ratings activity" :content>
        <ThemeSelect
          v-model="qualityRate"
          icon="humbleicons:arrows-up-down"
          class="col-span-1 lg:col-span-2"
          value-key="val"
          :items="qltyRateSetlect"
        />
      </UTooltip>

      <UButtonGroup class="col-span-1 sm:col-span-2">
        <UTooltip text="Quality time ratings" :content>
          <ThemeSelect
            v-model="timeTags"
            icon="game-icons:melting-ice-cube"
            class="w-[calc(100%-2.5rem)]"
            multiple
            :items="timeTagsSelect"
          />
        </UTooltip>
        <UTooltip text="Reset field" :content>
          <UButton class="w-[2.5rem]" icon="arcticons:cleaner" @click="resetTime()" />
        </UTooltip>
      </UButtonGroup>

      <UButtonGroup class="col-span-2 lg:col-span-3 xl:col-span-6">
        <UTooltip
          text="Activities tags (long list), reseting to default on main type change"
          :content
        >
          <ThemeSelect
            v-model="tags"
            icon="material-symbols:all-inclusive"
            class="w-[calc(100%-2.5rem)]"
            multiple
            :items="tagsSelect"
          />
        </UTooltip>
        <UTooltip text="Set defaults" :content>
          <UButton
            class="w-[2.5rem]"
            icon="hugeicons:arrow-reload-horizontal"
            @click="resetTags()"
          />
        </UTooltip>
      </UButtonGroup>

      <UButtonGroup class="col-span-2 lg:col-span-3 xl:col-span-4">
        <UTooltip
          text="Activities tags (long list), reseted to default on main type change"
          :content
        >
          <ThemeSelect
            v-model="trackTags"
            icon="hugeicons:ai-brain-01"
            class="w-[calc(100%-2.5rem)]"
            multiple
            :items="trackTagsSelect"
          />
        </UTooltip>
        <UTooltip text="Reset field" :content>
          <UButton class="w-[2.5rem]" icon="arcticons:cleaner" @click="() => resetTrack()" />
        </UTooltip>
      </UButtonGroup>
    </form>
  </ThemeCard>
</template>
