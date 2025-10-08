<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import BaseLayout from '@layouts/BaseLayout.vue'
import axios from 'axios'

const boards = ref([])
const scrollContainer = ref(null)
let onScrollHandler = null

onMounted(async () => {
  try {
    const res = await axios.get('http://quiztopia.bohoc.backend/api/list')
    boards.value = res.data.boards?.data || []
    await nextTick()
    if (boards.value.length > 1) setupInfinite()
  } catch (err) {
    console.error('Failed to fetch boards', err)
    boards.value = []
  }
})

onBeforeUnmount(() => {
  if (scrollContainer.value && onScrollHandler) {
    scrollContainer.value.removeEventListener('scroll', onScrollHandler)
  }
})

function setupInfinite() {
  const container = scrollContainer.value
  const n = boards.value.length
  if (!container || n < 2) return

  const cards = container.querySelectorAll('.carousel-card')
  if (cards.length < 2) return

  // measure full step (card width + gap) by difference of offsetLeft of first two cards
  const step = Math.abs(cards[1].offsetLeft - cards[0].offsetLeft) || cards[0].offsetWidth
  const oneCopyWidth = n * step

  // start in the middle (the "original" copy)
  container.scrollLeft = oneCopyWidth

  // scroll listener: when we pass either end, shift by oneCopyWidth to keep user in the middle copy
  onScrollHandler = () => {
    // small tolerance to avoid float precision issues
    if (container.scrollLeft <= 0) {
      container.scrollLeft += oneCopyWidth
    } else if (container.scrollLeft >= oneCopyWidth * 2 - 1) {
      container.scrollLeft -= oneCopyWidth
    }
  }

  container.addEventListener('scroll', onScrollHandler)
}

const scrollAmount = 300
const scrollLeft = () => scrollContainer.value?.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
const scrollRight = () => scrollContainer.value?.scrollBy({ left: scrollAmount, behavior: 'smooth' })
</script>

<template>
  <BaseLayout>
    <div class="flex flex-col items-center justify-center h-full">

      <div class="w-full max-w-4xl">
        <div class="flex items-center">
          <button
            @click="scrollLeft"
            class="flex-shrink-0 mr-4 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white shadow-lg"
            aria-label="scroll left"
          >
            ◀
          </button>

          <div
            ref="scrollContainer"
            class="flex-1 flex gap-4 overflow-x-auto scroll-smooth no-scrollbar px-4 py-4"
          >
            <template v-for="board in boards" :key="'c1-'+board.id">
              <div
                class="carousel-card w-48 h-32 flex-shrink-0 flex items-center justify-center rounded-lg shadow-lg text-white text-lg font-bold relative cursor-pointer transform hover:scale-105 transition"
                :style="board.imgURL
                  ? { backgroundImage: `url(${board.imgURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : { backgroundColor: board.color || '#666' }"
              >
                <div v-if="board.imgURL" class="absolute inset-0 rounded-lg" style="background: rgba(0,0,0,0.3)"></div>
                <h3 class="z-10 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{{ board.title }}</h3>
              </div>
            </template>

            <template v-for="board in boards" :key="'o-'+board.id">
              <div
                class="carousel-card w-48 h-32 flex-shrink-0 flex items-center justify-center rounded-lg shadow-lg text-white text-lg font-bold relative cursor-pointer transform hover:scale-105 transition"
                :style="board.imgURL
                  ? { backgroundImage: `url(${board.imgURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : { backgroundColor: board.color || '#666' }"
              >
                <div v-if="board.imgURL" class="absolute inset-0 rounded-lg" style="background: rgba(0,0,0,0.3)"></div>
                <h3 class="z-10 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{{ board.title }}</h3>
              </div>
            </template>

            <template v-for="board in boards" :key="'c2-'+board.id">
              <div
                class="carousel-card w-48 h-32 flex-shrink-0 flex items-center justify-center rounded-lg shadow-lg text-white text-lg font-bold relative cursor-pointer transform hover:scale-105 transition"
                :style="board.imgURL
                  ? { backgroundImage: `url(${board.imgURL})`, backgroundSize: 'cover', backgroundPosition: 'center' }
                  : { backgroundColor: board.color || '#666' }"
              >
                <div v-if="board.imgURL" class="absolute inset-0 rounded-lg" style="background: rgba(0,0,0,0.3)"></div>
                <h3 class="z-10 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{{ board.title }}</h3>
              </div>
            </template>
          </div>

          <button
            @click="scrollRight"
            class="flex-shrink-0 ml-4 p-3 rounded-full bg-black/40 hover:bg-black/60 text-white shadow-lg"
            aria-label="scroll right"
          >
            ▶
          </button>
        </div>
      </div>

      <a
        href="http://quiztopia.bohoc.quizgame/add-board"
        class="mt-8 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transition"
      >
        Kategória hozzáadása
      </a>
    </div>
  </BaseLayout>
</template>

<style scoped>
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
</style>
