<script setup lang="ts">
const { disabled = false } = defineProps<{
  disabled?: boolean
}>()

const { useAnalyzerFormStore } = await import('ANALYZER_LAYER/stores/lazy/form')
const form = useAnalyzerFormStore()

const tagsToAdd = ref<string[]>([])

const { saveNew } = useAnalyzerCreate()
function commit(activity: string, minutes: number) {
  const newLog: TimeLog = form.getNewTimeLog()

  if (activity === 'up') tagsToAdd.value = ['sport', 'calisthenics']
  const newAct = activity !== 'up' ? activity : 'rest'

  const { tags: defaultTags } = form.getDefaults(newAct) || {}
  if (defaultTags) newLog.tags = defaultTags
  if (tagsToAdd.value.length) for (const tag of tagsToAdd.value) newLog.tags.push(tag)

  const temp =
    work.includes(newAct) || coding.includes(newAct) || newAct === 'coding'
      ? newLog.tags.concat(form.trackTags, form.timeTags)
      : newLog.tags.concat(form.timeTags)

  newLog.tags = Array.from(new Set(temp))
  newLog.act = newAct
  newLog.dur = minutes

  saveNew(newLog)
  tagsToAdd.value = []
}

const rest = (minutes: number) => commit('rest', minutes)
</script>

<template>
  <ThemeCard>
    <UButtonGroup size="xl" class="w-full flex-wrap self-start lg:flex-nowrap">
      <UBadge :class="{ disabled }" class="justify-center">
        <small class="up sm:hidden md:block">Short<wbr />cuts:</small>
        <small class="up hidden sm:block md:hidden">SC:</small>
      </UBadge>

      <UBadge :class="{ disabled }" color="primary" class="up text-xs" label="Rest" />
      <UiButton
        color="primary"
        class="justify-center max-sm:grow"
        label="3 min."
        :disabled
        @click="rest(3)"
      />
      <UiButton color="primary" label="5 min." class="text-sm" :disabled @click="rest(5)" />
      <UiButton color="primary" label="15 min." class="text-sm" :disabled @click="rest(15)" />

      <UiButton color="success" class="text-xs" label="UP1" :disabled @click="commit('up', 1)" />
      <UiButton color="success" class="text-xs" label="UP3" :disabled @click="commit('up', 3)" />

      <UiButton
        label="Cleaning"
        class="up grow justify-center text-xs opacity-90"
        :disabled
        @click="commit('cleaning', 25)"
      />

      <UTooltip text="Test: +1min coding" :content="{ side: 'left' }">
        <UiButton label="+" :disabled @click="commit('coding', 1)" />
      </UTooltip>

      <UiButton :disabled="true" label="Wizzard" class="up h-10 grow justify-center text-xs" />
    </UButtonGroup>
  </ThemeCard>
</template>
