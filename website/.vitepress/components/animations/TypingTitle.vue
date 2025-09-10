<script setup lang="ts">
import { useTypingAnimation, wait } from '@sbozhook/core'
import { onMounted, ref } from 'vue'

const props = defineProps<{
  text: string
}>()

const title = useTypingAnimation(props.text)
const whiteTitle = useTypingAnimation()
const whiteTitleRight = useTypingAnimation()

const showFullTitle = ref(false)
const onlyMounted = ref(false)

onMounted(() => {
  onlyMounted.value = true
  queueMicrotask(async () => {
    whiteTitleRight.setDirection('rl')
    await wait(400)
    whiteTitleRight.typeMessage('Personal website', 40)
    showFullTitle.value = true
    await whiteTitle.typeMessage('Personal website', 40)
    const showDot = ref(false)
  })
})
</script>

<template>
  <div class="flex relative flex-col items-center gap-4 animate-fade-in">
    <span
      v-if="onlyMounted"
      class="text-pretty absolute text-4xl font-bold sm:text-6xl sm:font-extrabold md:text-7xl text-foreground min-w-[620px]"
    >
      <template v-if="showFullTitle">
        {{ whiteTitle.typingContent }}
      </template>
    </span>
    <span
      v-if="onlyMounted"
      class="text-pretty absolute text-right text-4xl font-bold sm:text-6xl sm:font-extrabold md:text-7xl text-foreground min-w-[620px] opacity-50"
    >
      {{ whiteTitleRight.typingContent }}
    </span>
    <h1
      class="text-pretty text-right text-4xl font-bold sm:text-6xl sm:font-extrabold md:text-7xl text-foreground min-w-[620px] opacity-5"
    >
      {{ title.typingContent }}
    </h1>
  </div>
</template>
