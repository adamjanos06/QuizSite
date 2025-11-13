<script setup>
import BaseLayout from '@layouts/BaseLayout.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const boardId = route.params.boardId

const allCards = ref([])
const quizCards = ref([])
const currentIndex = ref(0)
const score = ref(0)
const started = ref(false)
const finished = ref(false)
const questionCount = ref(20)
const selectedAnswer = ref(null)
const showFeedback = ref(false)
const correctAnswer = ref('')

onMounted(async () => {
  try {
    const res = await axios.get(`http://quiztopia.bohoc.backend/api/cards/by?board_id=${boardId}`)
    allCards.value = res.data.cards?.data || []
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

function startQuiz() {
  const count = Math.min(questionCount.value, allCards.value.length)
  quizCards.value = shuffleArray(allCards.value).slice(0, count).map(card => ({
    ...card,
    shuffledAnswers: shuffleArray(card.answers)
  }))
  started.value = true
  currentIndex.value = 0
  score.value = 0
  finished.value = false
  showFeedback.value = false
  selectedAnswer.value = null
}

function selectAnswer(answer) {
  if (showFeedback.value) return
  const currentCard = quizCards.value[currentIndex.value]
  selectedAnswer.value = answer
  correctAnswer.value = currentCard.answers[0]
  showFeedback.value = true
  if (answer === correctAnswer.value) {
    score.value++
  }
  setTimeout(() => {
    if (currentIndex.value < quizCards.value.length - 1) {
      currentIndex.value++
      showFeedback.value = false
      selectedAnswer.value = null
    } else {
      finished.value = true
    }
  }, 1000)
}

function goBack() {
  window.location.href = `http://quiztopia.bohoc.quizgame/board/${boardId}`
}
</script>

<template>
  <BaseLayout>
    <section class="flex flex-col items-center justify-center py-40 text-black font-[Jersey_10]">
      <div v-if="!started" class="w-full max-w-lg bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col gap-6">
        <h1
          class="text-5xl md:text-6xl mb-10 text-white text-center drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)] tracking-wider"
        >
          Kvíz játék
        </h1>
        <label
          class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
        >
          Kérdések száma
        </label>
        <input
          v-model="questionCount"
          type="number"
          min="1"
          class="w-full bg-white/20 border-2 border-white/40 text-white text-xl rounded-xl px-4 py-3 outline-none placeholder-white/60 focus:border-cyan-400 focus:bg-white/30 transition"
        />
        <button
          @click="startQuiz"
          class="mt-6 bg-cyan-500 hover:bg-cyan-600 text-black text-4xl font-bold py-4 rounded-4xl border-3 border-white transition transform hover:scale-105 shadow-2xl"
          style="text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;"
        >
          Kvíz indítása
        </button>
      </div>

      <div v-else-if="finished" class="w-full max-w-lg bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col gap-6">
        <h2
          class="text-3xl md:text-4xl mb-10 text-white text-center drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)] tracking-wider"
        >
          Végeredmény
        </h2>
        <p class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">Pontszám: {{ score }} / {{ quizCards.length }}</p>
      </div>

      <div v-else class="w-full max-w-lg bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col gap-6">
        <h3
          class="text-3xl md:text-4xl mb-6 text-white text-center drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)] tracking-wider"
        >
          {{ quizCards[currentIndex].question }}
        </h3>
        <div class="flex flex-col gap-2.5 mt-5">
          <div
            v-for="(answer, i) in quizCards[currentIndex].shuffledAnswers"
            :key="i"
            @click="selectAnswer(answer)"
            class="border border-black p-2.5 text-2xl cursor-pointer text-center"
            :style="{
              backgroundColor:
                showFeedback && answer === correctAnswer
                  ? 'lightgreen'
                  : showFeedback && selectedAnswer === answer && answer !== correctAnswer
                  ? '#ff6666'
                  : 'white'
            }"
          >
            {{ answer }}
          </div>
        </div>
        <p class="block text-2xl mt-5 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">{{ currentIndex + 1 }} / {{ quizCards.length }}</p>
        <p class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]">Pontszám: {{ score }}</p>


      </div>
      <button
        @click="goBack"
        class="mt-8 bg-black/40 hover:bg-black/60 text-white py-3 px-8 rounded-2xl shadow-lg text-lg transition"
      >
        Vissza
      </button>
    </section>
  </BaseLayout>
</template>