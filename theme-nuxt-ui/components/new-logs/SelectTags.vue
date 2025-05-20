<script lang="ts" setup>
const { useAnalyzerFormStore } = await import('ANALYZER_LAYER/stores/lazy/form')
const form = useAnalyzerFormStore()
const { tags } = storeToRefs(form)

const tagsSelect = [activities, coding, work, life, homeStuff, sport, appetite] as string[][]

type ItemWithChip = {
  label: string
  value: string
  chip: { color: NuxtUiColor }
}

function convertToSelectOptions(items: string[]): ItemWithChip[] {
  return items.map((tag: TimeLogTag) => ({
    label: tag,
    value: tag,
    chip: { color: getActTagColor(tag) as NuxtUiColor },
  }))
}

function convertToRawData(options: ItemWithChip[]): string[] {
  return options.map((opt) => opt.value)
}

const tagsItems = computed<ItemWithChip[][]>(() =>
  tagsSelect.map((row) => convertToSelectOptions(row))
)

const tagsModel = computed<ItemWithChip[]>({
  get: () => convertToSelectOptions(tags.value),
  set(options) {
    tags.value = convertToRawData(options)
  },
})

const content: TooltipContentConfig = { side: 'top' }
</script>

<template>
  <UiButtonGroup>
    <UTooltip text="Activities tags (long list), reseting to default on main type change" :content>
      <UiSelectMenu
        v-model="tagsModel"
        icon="material-symbols:all-inclusive"
        class="w-[calc(100%-2.5rem)]"
        multiple
        :items="tagsItems"
      />
    </UTooltip>
    <UTooltip text="Set defaults" :content>
      <UiButton
        class="w-[2.5rem]"
        icon="hugeicons:arrow-reload-horizontal"
        @click="form.resetTags()"
      />
    </UTooltip>
  </UiButtonGroup>
</template>
