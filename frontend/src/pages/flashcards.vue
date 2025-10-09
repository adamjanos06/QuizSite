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
    <card>
      <div v-if="cards.length === 0">
        Kártyák betöltése...
      </div>

      <div v-else-if="isFinished">
        <p>Minden kártyát megtekintettél!</p>
        <button @click="goBack">Vissza a tábla oldalára</button>
      </div>

      <div v-else>
        <div>
          <p v-if="!showAnswer">{{ cards[currentIndex].question }}</p>
          <p v-else>{{ cards[currentIndex].answers[0] }}</p>
        </div>

        <div>
          <button @click="flipCard">
            {{ showAnswer ? 'Mutasd a kérdést' : 'Mutasd a választ' }}
          </button>
        </div>

        <button @click="nextCard">Következő</button>
        <p>{{ currentIndex + 1 }} / {{ cards.length }}</p>
      </div>
    </card>
  </BaseLayout>
</template>
