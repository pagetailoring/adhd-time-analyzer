<script setup lang="ts">
const { useAnalyzerFormStore } = await import('ANALYZER_LAYER/stores/lazy/form')
const form = useAnalyzerFormStore()

const tagToAdd = ref<undefined | string>()

const { saveNew } = useAnalyzerCreate()
function commit(activity: string, minutes: number) {
  const newLog: TimeLog = form.getNewTimeLog()
  const { tags: defaultTags } = form.getDefaults(activity) || {}
  if (defaultTags) newLog.tags = defaultTags
  if (tagToAdd.value) newLog.tags.push(tagToAdd.value)

  const temp =
    work.includes(activity) || coding.includes(activity) || activity === 'coding'
      ? newLog.tags.concat(form.trackTags, form.timeTags)
      : newLog.tags.concat(form.timeTags)

  newLog.tags = Array.from(new Set(temp))
  newLog.act = activity
  newLog.dur = minutes

  saveNew(newLog)
  tagToAdd.value = undefined
}

const rest = (minutes: number) => commit('rest', minutes)
function chaos(minutes = 25) {
  if (minutes > 25) tagToAdd.value = 'rabbit hole'
  commit('chaos', minutes)
}
</script>

<template>
  <ThemeCard>
    <UButtonGroup size="xl" class="w-full flex-wrap lg:flex-nowrap self-start">
      <UBadge>
        <small :class="styleUp">Short<wbr />cuts:</small>
      </UBadge>

      <UBadge color="primary" :class="styleUp" style="text-sm" label="Rest" />
      <UiButton
        color="primary"
        class="max-sm:grow justify-center"
        label="3 min."
        @click="rest(3)"
      />
      <UiButton color="primary" label="5 min." @click="rest(5)" />
      <UiButton color="primary" label="15 min." class="grow justify-center" @click="rest(15)" />

      <UiButton
        label="Cleaning"
        :class="styleUp"
        class="opacity-90 grow justify-center text-sm"
        @click="commit('cleaning', 25)"
      />

      <UiButton color="warning" label="Chaos" :class="styleUp" @click="chaos(25)" />
      <UiButton
        color="warning"
        class="max-sm:grow justify-center"
        label="40 min."
        @click="chaos(40)"
      />
      <UiButton color="warning" label="60 min." @click="chaos(60)" />

      <UTooltip text="Test: +1min coding" :content="{ side: 'left' }">
        <UiButton label="+" @click="commit('coding', 1)" />
      </UTooltip>

      <UiButton
        color="info"
        label="coding"
        :class="styleUp"
        class="grow justify-center"
        @click="commit('coding', 25)"
      />

      <UBadge class="hidden xl:block content-center text-xs" :class="styleUp">
        25 min. default
      </UBadge>
    </UButtonGroup>
  </ThemeCard>
</template>
