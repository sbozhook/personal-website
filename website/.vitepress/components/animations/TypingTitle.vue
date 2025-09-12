<script setup lang="ts">
import { useTypingAnimation, wait } from '@sbozhook/core'
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
  text: string
  delay?: number
}>(), {
  delay: 0,
})

const emit = defineEmits(['finish'])
const title = useTypingAnimation(props.text)
const whiteTitle = useTypingAnimation()
const whiteTitleRight = useTypingAnimation()

const showFullTitle = ref(false)
const animateGoTop = ref(false)
const onlyMounted = ref(false)
const onlyAfterDelay = ref(false)

const timeCoef = ref(1)
const tc = (number: number) => number * timeCoef.value
function animate() {
  queueMicrotask(async () => {
    // title.typeMessage(props.text, 0)
    await wait(tc(props.delay))
    onlyAfterDelay.value = true
    whiteTitleRight.setDirection('rl')
    await wait(400)
    whiteTitleRight.typeMessage(props.text, tc(1000))
    showFullTitle.value = true
    await whiteTitle.typeMessage(props.text, tc(1000))
    await wait(tc(50))
    animateGoTop.value = true
    emit('finish')
  })
}
onMounted(() => {
  onlyMounted.value = true

  animate()
})

watch(() => props.text, () => {
  animate()
})
</script>

<template>
  <div
    v-if="onlyAfterDelay"
    class="flex relative flex-col items-center gap-4 animate-fade-in bigger"
    :class="{
      'animate-go-top': animateGoTop,
    }"
  >
    <span
      v-if="onlyMounted"
      class="text-pretty absolute text-4xl font-bold sm:text-6xl sm:font-extrabold md:text-7xl z-10 text-foreground w-full transition-colors"
      :class="{
        'text-muted-foreground': animateGoTop,
      }"
    >
      <template v-if="showFullTitle">
        {{ whiteTitle.typingContent }}
      </template>
    </span>
    <span
      v-if="onlyMounted"
      class="text-pretty absolute text-right text-4xl font-bold sm:text-6xl sm:font-extrabold md:text-7xl text-muted-foreground w-full"
    >
      {{ whiteTitleRight.typingContent }}
    </span>
    <h1
      class="text-pretty text-right text-4xl font-bold sm:text-6xl sm:font-extrabold md:text-7xl text-foreground opacity-5"
    >
      {{ title.typingContent }}
    </h1>
  </div>
</template>

<style lang="scss" scoped>
@keyframes slide {
  0% {
    scale: 1.4
  }
  100% {
    transform: translateY(-2em);
    scale: 0.8;
  }
}

.bigger {
  transform: translateY(2em);
  scale: 1.2
}

/* Apply the animation */
.animate-go-top {
  animation: slide 0.3s cubic-bezier(0.36, 0, 0.66, -0.56) forwards;
}
</style>
