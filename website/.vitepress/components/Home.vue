<script setup lang="ts">
import { Icon } from '@iconify/vue'
import Chip from './Chip.vue'

const usage = ['tailwind', 'vue', 'react', 'ts']
</script>

<template>
  <section class="flex-1">
    <div class="grid justify-items-center gap-8 p-5 px-3 sm:px-4 md:gap-10 md:px-8">
      <div class="mt-2 grid w-full max-w-4xl justify-items-center gap-[inherit] sm:mt-10 md:mt-20">
        <div class="flex flex-col items-center gap-4">
          <Chip href="/docs/overview/releases">
            <div class="group-hover:scale-150 group-focus:scale-150 transition origin-bottom-left">
              🛠️
            </div>
            <span class="group-hover:ml-3 group-focus:ml-3 ml-1 transition-[margin]">In Development</span>
          </Chip>
          <h1
            class="text-pretty text-center text-4xl font-bold sm:text-6xl sm:font-extrabold md:text-7xl text-foreground"
          >
            Tailwind CCS <br> Typescript widget
          </h1>
        </div>

        <p
          class="max-w-[720px] text-pretty text-center text-lg md:text-xl md:leading-8 lg:leading-9 lg:text-2xl text-muted-foreground"
        >
          An open-source library based on <br>
          <a
            class="relative inline-block text-foreground font-semibold before:absolute before:top-full before:inset-x-0 before:[translate:0_-0.1em] before:h-[2px] before:bg-primary hover:before:h-[4px]"
            href="/website/guides/styling"
          >
            shadcn-vue</a> and <a
            class="relative inline-block text-foreground font-semibold before:absolute before:top-full before:inset-x-0 before:[translate:0_-0.1em] before:h-[2px] before:bg-primary hover:before:h-[4px]"
            href="/website/guides/styling"
          >
            reka-ui</a>.<br>
        </p>
      </div>
      <div class="mb-12 flex max-w-[calc(100%-2rem)] flex-wrap items-center justify-center gap-4 md:mb-20">
        <a
          class="flex items-center justify-center gap-2 whitespace-nowrap rounded-lg py-2.5 px-5 bg-primary font-semibold text-primary-foreground hover:bg-primary/90"
          href="/website/overview/getting-started"
        >
          Get started
        </a>
        <a
          class="group flex items-center justify-center gap-2 font-semibold text-foreground/70 hover:text-foreground whitespace-nowrap rounded-lg py-2.5 px-5 hover:bg-card border border-muted bg-muted/50"
          href="/website/components/checkbox"
        >
          Explore Playground
          <Icon icon="lucide:arrow-right" />
        </a>
      </div>
    </div>
  </section>

  <section>
    <div class="grid justify-items-center gap-4 px-3 md:gap-4">
      <div class="flex gap-4">
        <img
          v-for="url in usage"
          :key="url"
          class="w-6 md:w-6"
          alt="CoinCaster Logo"
          :src="`${url}.svg`"
        >
      </div>
    </div>
  </section>

  <footer class="px-4 py-8 max-w-screen-xl mx-auto md:px-6 justify-center flex">
    <div class="text-muted-foreground text-sm">
      2025 @ sbozhook
    </div>
  </footer>
</template>
