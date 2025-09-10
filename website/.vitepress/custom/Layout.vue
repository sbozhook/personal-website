<script setup lang="ts">
import { useScroll } from '@vueuse/core'
import { TooltipProvider } from 'reka-ui'
import { useData, useRoute } from 'vitepress'
import { toRefs } from 'vue'
import Home from '../components/Home.vue'
import ThemeToggle from '../components/ThemeToggle.vue'
import Docs from './Docs.vue'

const { site, theme, frontmatter, isDark } = useData()
const { path } = toRefs(useRoute())
const { arrivedState } = useScroll(globalThis.window)
const { top } = toRefs(arrivedState)
</script>

<template>
  <TooltipProvider>
    <div class="flex flex-col items-center min-h-screen h-full justify-center">
      <header
        class="w-full py-4 sticky top-0 z-20 transition-all duration-500 h-[68px] md:h-full"
        :class="[top ? 'bg-transparent backdrop-blur-0' : 'bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/90']"
      >
        <div class="max-w-[768px] h-[96px] flex align-top items-center justify-between mx-auto px-6">
          <div class="w-full justify-between md:justify-normal flex items-center gap-4 animate-fade-in-right">
            <a
              href="/"
              class="flex items-center"
            >
              <div class="rounded overflow-hidden">
                <img
                  class="w-24 md:w-15 rounded-full"
                  alt="Logo"
                  :src="isDark ? theme.logo : '/logo-light.png'"
                >
              </div>
            </a>
            <div class="flex flex-col gap-1">
              <span class="font-bold text-xl md:text-2xl">{{ site.title }}</span>
              <div class="flex text-sm md:text-md text-muted-foreground gap-1">
                <img
                  class="w-3 md:w-15 rounded-full"
                  alt="Logo"
                  src="/ts.svg"
                >
                <span>Software developer based in 🇨🇿 Prague from 🇺🇦 Odessa</span>
              </div>
              <span class="flex text-sm md:text-md text-muted-foreground">🎯 T-shaped skills with 10+ years of experience</span>
            </div>
          </div>

          <div class="align-top h-full py-4 animate-fade-in-left">
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div
        v-if="frontmatter.layout === 'home'"
        class="h-full flex flex-col justify-between flex-1 w-full"
      >
        <main class="flex flex-col justify-around flex-1">
          <Home />
        </main>
      </div>

      <div
        v-else
        class="max-w-[1440px] w-full h-full grow"
      >
        <Docs />
      </div>
    </div>
  </TooltipProvider>
</template>
