<script setup lang="ts">
import { useTypingAnimation, wait } from '@sbozhook/core'
import { onMounted, ref } from 'vue'
import TypingTitle from './animations/TypingTitle.vue'

// const message = buildMessage('Hi there!', { role: 'assistant' })

const title = useTypingAnimation('Personal website')
const whiteTitle = useTypingAnimation()
const whiteTitleRight = useTypingAnimation()

const showFullTitle = ref(false)
const onlyMounted = ref(false)
const showDot = ref(false)
onMounted(() => {
  onlyMounted.value = true
  queueMicrotask(async () => {
    whiteTitleRight.setDirection('rl')
    title.typeMessage('Personal website', 20)
    await wait(400)
    whiteTitleRight.typeMessage('Personal website', 40)
    showFullTitle.value = true
    await whiteTitle.typeMessage('Personal website', 40)
    showDot.value = true
  })
})
</script>

<template>
  <section class="flex-1">
    <div class="grid justify-items-center gap-8 p-5 px-3 sm:px-4 md:gap-10 md:px-8">
      <div class="mt-2 grid w-full max-w-4xl justify-items-center gap-[inherit] sm:mt-10 md:mt-20">
        <TypingTitle text="Personal website" />

        <!--        <div> -->
        <!--          <TypingMessage :message="message"/> -->
        <!--        </div> -->
      </div>
    </div>
  </section>

  <footer class="px-4 py-8 max-w-screen-xl mx-auto md:px-6 justify-center flex">
    <div class="text-muted-foreground text-sm">
      2025 @ sbozhook
    </div>
  </footer>
</template>

<style>

</style>
