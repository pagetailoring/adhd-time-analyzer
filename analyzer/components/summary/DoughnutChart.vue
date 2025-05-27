<script setup lang="ts">
const { radius = 120, strokeWidth = 30 } = defineProps<{
  radius?: number | undefined
  strokeWidth?: number | undefined
}>()

type ChartData = {
  label: string
  value: number
  path: string
  color?: string
}

const { data, totalTrackedMinutes, totalTrackedTime } = storeToRefs(useAnalyzerSummaryStore())

function polarToCartesian(angle: number) {
  const radians = (angle - 90) * (Math.PI / 180.0)
  const x = radius + radius * Math.cos(radians)
  const y = radius + radius * Math.sin(radians)
  return { x, y }
}
const size = computed(() => radius * 2)
const center = computed(() => radius)

const segments = computed<ChartData[]>(() => {
  let startAngle = 0

  return data.value.map((item) => {
    const value = item.totalTime
    const angle = (value / totalTrackedMinutes.value) * 360
    const endAngle = startAngle + angle
    const largeArc = angle > 180 ? 1 : 0
    const start = polarToCartesian(startAngle)
    const end = polarToCartesian(endAngle)

    const { color, label } = item
    const path = [
      `M ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`,
    ].join(' ')

    const result = { label, value, path, color }
    startAngle = endAngle

    return result
  })
})

const { ping } = useProcessingState()
watch(segments, () => ping('doughnut'))

const emit = defineEmits<{ (event: 'isMounted'): void }>()
onMounted(() => emit('isMounted'))
</script>

<template>
  <svg
    :width="size"
    :height="size"
    :viewBox="`0 0 ${size} ${size}`"
    style="
      overflow: visible;
      display: block;
      margin: auto;
      width: 100%;
      height: auto;
      max-height: 80%;
      aspect-ratio: 1;
    "
  >
    <path
      v-for="(segment, i) in segments"
      :key="i"
      :d="segment.path"
      fill="none"
      :stroke="segment.color"
      :stroke-width="strokeWidth"
      stroke-linecap="butt"
    />

    <text
      :x="center"
      :y="center"
      text-anchor="middle"
      dominant-baseline="middle"
      font-size="18"
      fill="currentColor"
    >
      {{ totalTrackedTime }}
    </text>
  </svg>
</template>
