<script setup>
const title = 'Quiztopia'
</script>

<template>
  <header class="bg-transparet text-white border-b border-white">
    <div class="flex justify-center p-6">
      <RouterLink to="/" class="flex items-center space-x-3">
        <span class="lg:text-9xl md:text-8xl sm:text-5xl font-jersey tracking-[12px] select-none text-outline-black drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">Quiztopia</span>
      </RouterLink>
    </div>
  </header>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Jersey+10&display=swap');

:root {
  --jersey: "Jersey 10", sans-serif;
}
html, body {
  font-family: var(--jersey);
}
.font-jersey {
  font-family: var(--jersey);
}
.text-outline-black {
  text-shadow:
    -3px -3px 0 #000,
     3px -3px 0 #000,
    -3px  3px 0 #000,
     3px  3px 0 #000;
}
</style>