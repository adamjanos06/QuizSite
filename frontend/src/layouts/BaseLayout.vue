<script setup>
import BaseHeader from '@components/layout/BaseHeader.vue'
</script>

<template>
  <div
    class="min-h-screen relative bg-fixed bg-center bg-cover"
    :style="{ backgroundImage: 'url(https://cdn.imgchest.com/files/3b2737e8b192.png)' }"
  >
    <div class="absolute inset-0 pointer-events-none"></div>

    <div class="relative z-10 flex flex-col min-h-screen">
      <BaseHeader />

      <main class="flex-1 container mx-auto">
        <slot />
      </main>

      <footer class="w-full h-48 bg-gray-300/80 backdrop-blur-md flex justify-center items-center mt-12">
      </footer>
    </div>
  </div>
</template>

<style>
html, body, #app {
  height: 100%;
}
</style>