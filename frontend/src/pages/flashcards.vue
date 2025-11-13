<script setup>
import BaseLayout from '@layouts/BaseLayout.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const boardId = route.params.boardId

const cards = ref([])
const currentIndex = ref(0)
const showAnswer = ref(false)
const isFinished = ref(false)

onMounted(async () => {
  try {
    const res = await axios.get(`http://quiztopia.bohoc.backend/api/cards/by?board_id=${boardId}`)
    const fetchedCards = res.data.cards?.data || []
    cards.value = shuffleArray(fetchedCards)
  } catch (err) {
    console.error('Failed to load cards', err)
  }
})

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function flipCard() {
  showAnswer.value = !showAnswer.value
}

function nextCard() {
  if (currentIndex.value < cards.value.length - 1) {
    currentIndex.value++
    showAnswer.value = false
  } else {
    isFinished.value = true
  }
}

function goBack() {
  window.location.href = `http://quiztopia.bohoc.quizgame/board/${boardId}`
}
</script>

<template>
  <BaseLayout>
    <section class="flex flex-col items-center justify-center py-40 text-black font-[Jersey_10]">
      <card class="w-full max-w-lg bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col gap-6">

        <div v-if="cards.length === 0" class="text-2xl md:text-3xl mb-6 text-white text-center drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)] tracking-wider"
        >
          Kártyák betöltése...
        </div>

        <div v-else-if="isFinished" class="text-2xl md:text-3xl text-white text-center drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)] tracking-wider"
        >
          <p>Minden kártyát megtekintettél!</p>
        </div>

        <div v-else >
          <div class="text-3xl md:text-4xl mb-12 text-white text-center drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)] tracking-wider"
        >
            <p v-if="!showAnswer">
              {{ cards[currentIndex].question }}
            </p>
            <p v-else>
              {{ cards[currentIndex].answers[0] }}
            </p>
          </div>

          <div>
            <button @click="flipCard" class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
              {{ showAnswer ? 'Mutasd a kérdést' : 'Mutasd a választ' }}
            </button>
          </div>

          <button @click="nextCard" class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
            Következő
          </button>

          <p class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">
            {{ currentIndex + 1 }} / {{ cards.length }}
          </p>
        </div>

      </card>

      <button
        @click="goBack"
        class="mt-8 bg-black/40 hover:bg-black/60 text-white py-3 px-8 rounded-2xl shadow-lg text-lg transition"
      >
        Vissza
      </button>
    </section>
  </BaseLayout>
</template>
