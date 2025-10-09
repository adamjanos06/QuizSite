<script setup>
import BaseLayout from '@layouts/BaseLayout.vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const boardId = route.params.boardId

function goTo(path) {
  if (!boardId) return
  window.location.href = `http://quiztopia.bohoc.quizgame/${path}/${boardId}`
}
</script>

<template>
  <BaseLayout>
    <h1>ide baszhattok vmi textet</h1>
    <div>
      <button
        @click="goTo('flashcards')"
        class="py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl font-semibold shadow-lg transition"
      >
        Flashcards
      </button>

      <button
        @click="goTo('quiz')"
        class="py-3 bg-emerald-500 hover:bg-emerald-600 rounded-xl font-semibold shadow-lg transition"
      >
        Quiz Game
      </button>

      <button
        @click="goTo('add-card')"
        class="py-3 bg-orange-500 hover:bg-orange-600 rounded-xl font-semibold shadow-lg transition"
      >
        Add Card
      </button>
    </div>
  </BaseLayout>
</template>
