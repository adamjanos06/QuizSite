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

  const step = Math.abs(cards[1].offsetLeft - cards[0].offsetLeft) || cards[0].offsetWidth
  const oneCopyWidth = n * step

  container.scrollLeft = oneCopyWidth

  onScrollHandler = () => {
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

function openBoard(boardId) {
  window.location.href = `http://quiztopia.bohoc.quizgame/board/${boardId}`
}
</script>

<template>
  <BaseLayout>
    <div
      class="mt-40 flex flex-col items-center justify-center">


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
            class="flex gap-6 overflow-x-auto scroll-smooth no-scrollbar px-6 py-6 items-end"
          >
            <!-- C1 TEMPLATE -->
            <template v-for="board in boards" :key="'c1-'+board.id">
              <div
                class="carousel-card w-56 h-48 flex-shrink-0 rounded-3xl border-2 border-white/30 bg-white/5 backdrop-blur-md overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 relative"
                @click="openBoard(board.id)"
              >
                <img
                  :src="board.imgURL || 'https://cdn.imgchest.com/files/8064575b36d0.png'"
                  :alt="board.title"
                  class="w-full h-32 object-cover object-center"
                />

                <div class="absolute left-0 right-0 bottom-0 h-16 pointer-events-none">
                  <div class="h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              
                <div class="absolute left-0 right-0 bottom-3 text-center px-3">
                  <span class="text-2xl font-bold text-white text-outline-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {{ board.title }}
                  </span>
                </div>
              
                <div class="absolute inset-0 pointer-events-none ring-overlay rounded-3xl"></div>
              </div>
            </template>
          
            <!-- O TEMPLATE -->
            <template v-for="board in boards" :key="'o-'+board.id">
              <div
                class="carousel-card w-56 h-48 flex-shrink-0 rounded-3xl border-2 border-white/30 bg-white/5 backdrop-blur-md overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 relative"
                @click="openBoard(board.id)"
              >
                <img
                  :src="board.imgURL || 'https://cdn.imgchest.com/files/7b01609e5e8f.png'"
                  :alt="board.title"
                  class="w-full h-32 object-cover object-center"
                />
            
                <div class="absolute left-0 right-0 bottom-0 h-16 pointer-events-none">
                  <div class="h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              
                <div class="absolute left-0 right-0 bottom-3 text-center px-3">
                  <span class="text-2xl font-bold text-white text-outline-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {{ board.title }}
                  </span>
                </div>
              
                <div class="absolute inset-0 pointer-events-none ring-overlay rounded-3xl"></div>
              </div>
            </template>
          
            <!-- C2 TEMPLATE -->
            <template v-for="board in boards" :key="'c2-'+board.id">
              <div
                class="carousel-card w-56 h-48 flex-shrink-0 rounded-3xl border-2 border-white/30 bg-white/5 backdrop-blur-md overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 relative"
                @click="openBoard(board.id)"
              >
                <img
                  :src="board.imgURL || 'https://cdn.imgchest.com/files/a1c7aa5a7938.png'"
                  :alt="board.title"
                  class="w-full h-32 object-cover object-center"
                />
            
                <div class="absolute left-0 right-0 bottom-0 h-16 pointer-events-none">
                  <div class="h-full bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              
                <div class="absolute left-0 right-0 bottom-3 text-center px-3">
                  <span class="text-2xl font-bold text-white text-outline-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                    {{ board.title }}
                  </span>
                </div>
              
                <div class="absolute inset-0 pointer-events-none ring-overlay rounded-3xl"></div>
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
        class="mt-40 py-5 px-12 text-4xl font-bold text-black rounded-4xl border-3 border-white bg-cyan-500 hover:bg-cyan-600 shadow-lg text-center transition-all"
        style="text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;"
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
