<script setup lang="ts">
import Promo from './animations/controllers/Promo.vue'
</script>

<template>
  <section class="flex-1">
    <div class="grid justify-items-center gap-8 p-5 px-3 sm:px-4 md:gap-10 md:px-8">
      <div class="mt-2 grid w-full max-w-4xl justify-items-center gap-[inherit]">
        <Promo />
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
