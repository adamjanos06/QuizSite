<script setup>
import BaseLayout from '@layouts/BaseLayout.vue'
import { useRoute } from 'vue-router'
import { ref, onMounted, nextTick } from 'vue'
import axios from 'axios'


const boards = ref([])
const currBoard = ref(null)
const route = useRoute()
const boardId = route.params.boardId
onMounted(async () => {
  try {
    const res = await axios.get('http://quiztopia.bohoc.backend/api/list')
    boards.value = res.data.boards?.data || []
    await nextTick()
    currBoard.value = boards.value.find(b => String(b.id) === String(boardId)) || null
    if (!currBoard.value) {
      console.warn(`Nem található board ezzel az ID-val: ${boardId}`)
    }

  } catch (err) {
    console.error('Failed to fetch boards', err)
    boards.value = []
    currBoard.value = null
  }
})

function goTo(path) {
  if (!boardId) return
  window.location.href = `http://quiztopia.bohoc.quizgame/${path}/${boardId}`
}
function goBack() {
  window.location.href = `http://quiztopia.bohoc.quizgame/`
}
</script>

<template>
  <BaseLayout>
    <div class="flex flex-col items-center justify-center py-40 text-white font-[Jersey_10]">
      <div
        class="w-full max-w-lg bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col gap-6"
      >
        <div v-if="currBoard">
        <h1 class="text-4xl md:text-6xl text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wider">
                {{ currBoard.title }}
              </h1>   
      </div>
        <button
          @click="goTo('flashcards')"
          class="mt-0 bg-cyan-500 hover:bg-cyan-700 text-black text-4xl font-bold py-5 rounded-3xl border-4 border-white transition transform hover:scale-105 shadow-xl w-full"
          style="text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;"
        >
          Flashcards
        </button>

        <button
          @click="goTo('quiz')"
          class="mt-6 bg-green-500 hover:bg-green-700 text-black text-4xl font-bold py-5 rounded-3xl border-4 border-white transition transform hover:scale-105 shadow-xl w-full"
          style="text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;"
        >
          Quiz Game
        </button>

        <button
          @click="goTo('add-card')"
          class="mt-6 bg-orange-500 hover:bg-orange-700 text-black text-4xl font-bold py-5 rounded-3xl border-4 border-white transition transform hover:scale-105 shadow-xl w-full"
          style="text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;"
        >
          Kártya Hozzáadása
        </button>
      </div>
      <button
        @click="goBack"
        class="mt-8 bg-black/40 hover:bg-black/60 text-white py-3 px-8 rounded-2xl shadow-lg text-lg transition"
      >
        Vissza
      </button>
      
    </div>
  </BaseLayout>
</template>