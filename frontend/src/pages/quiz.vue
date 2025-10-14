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
    <div v-if="!started">
      <h1>Quiz Game</h1>
      <label>Kérdések száma:</label>
      <input type="number" v-model="questionCount" min="1" />
      <button @click="startQuiz">Start</button>
    </div>

    <div v-else-if="finished">
      <h2>Végeredmény</h2>
      <p>Pontszám: {{ score }} / {{ quizCards.length }}</p>
      <button @click="goBack">Vissza a tábla oldalára</button>
    </div>

    <div v-else>
      <h3>{{ quizCards[currentIndex].question }}</h3>
      <div style="display: flex; flex-direction: column; gap: 10px; margin-top: 20px;">
        <div
          v-for="(answer, i) in quizCards[currentIndex].shuffledAnswers"
          :key="i"
          @click="selectAnswer(answer)"
          style="border: 1px solid black; padding: 10px; cursor: pointer; text-align: center;"
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
      <p style="margin-top: 15px;">{{ currentIndex + 1 }} / {{ quizCards.length }}</p>
      <p>Pontszám: {{ score }}</p>
    </div>
  </BaseLayout>
</template>
