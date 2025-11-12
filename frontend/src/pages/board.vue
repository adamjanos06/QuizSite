<script setup>
import BaseLayout from '@layouts/BaseLayout.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const boardId = route.params.boardId

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
        <button
          @click="goTo('flashcards')"
          class="mt-6 bg-cyan-500 hover:bg-cyan-700 text-black text-4xl font-bold py-5 rounded-3xl border-4 border-white transition transform hover:scale-105 shadow-xl w-full"
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
          Add Card
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