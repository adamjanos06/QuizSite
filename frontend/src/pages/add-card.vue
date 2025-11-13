<script setup>
import BaseLayout from '@layouts/BaseLayout.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const route = useRoute()

const boardId = route.params.boardId 

const question = ref('')
const correctAnswer = ref('')
const falseAnswer1 = ref('')
const falseAnswer2 = ref('')
const falseAnswer3 = ref('')
const successMessage = ref('')

function createCard() {
  if (!question.value || !correctAnswer.value || !falseAnswer1.value || !falseAnswer2.value || !falseAnswer3.value) {
    return alert('Minden mező kitöltése kötelező')
  }

  const answers = [correctAnswer.value, falseAnswer1.value, falseAnswer2.value, falseAnswer3.value]

  const payload = {
    question: question.value,
    answers: answers,
    board_id: boardId
  }
  
  console.log('payload:', payload)
  axios.post('http://quiztopia.bohoc.backend/api/cards', payload)
    .then(() => {
      successMessage.value = 'Kártya sikeresen hozzáadva!'
      question.value = ''
      correctAnswer.value = ''
      falseAnswer1.value = ''
      falseAnswer2.value = ''
      falseAnswer3.value = ''
    })
    .catch(error => {
      console.error('Failed to add card:', error)
    })
}
function goBack() {
  window.location.href = `http://quiztopia.bohoc.quizgame/board/${boardId}`
}
</script>

<template>
  <BaseLayout>
    <div class="flex flex-col items-center justify-center py-20 text-white font-[Jersey_10]">
      <h1
        class="text-5xl md:text-6xl mb-10 text-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] tracking-wider"
      >
        Új Kártya Hozzáadása
      </h1>

      <div
        class="w-full max-w-lg bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col gap-6"
      >
      
        <div v-if="successMessage" class="bg-green-100 text-green-800 p-3 rounded">
          {{ successMessage }}
        </div>

        <div>
          <label
            class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
          >
            Kérdés
          </label>
          <input
            v-model="question"
            type="text"
            placeholder="Pl. Kinek van már elege ebből?"
            class="w-full bg-white/20 border-2 border-white/40 text-white text-xl rounded-xl px-4 py-3 outline-none placeholder-white/60 focus:border-cyan-400 focus:bg-white/30 transition"
          />
        </div>

        <div>
          <label
            class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
          >
            Helyes válasz
          </label>
          <input
            v-model="correctAnswer"
            type="text"
            placeholder="Helyes válasz"
            class="w-full bg-white/20 border-2 border-white/40 text-white text-xl rounded-xl px-4 py-3 outline-none placeholder-white/60 focus:border-cyan-400 focus:bg-white/30 transition"
          />
        </div>

        <div>
          <label
            class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
          >
            Hamis válasz 1
          </label>
          <input
            v-model="falseAnswer1"
            type="text"
            placeholder="Hamis válasz 1"
            class="w-full bg-white/20 border-2 border-white/40 text-white text-xl rounded-xl px-4 py-3 outline-none placeholder-white/60 focus:border-cyan-400 focus:bg-white/30 transition"
          />
        </div>

        <div>
          <label
            class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
          >
            Hamis válasz 2
          </label>
          <input
            v-model="falseAnswer2"
            type="text"
            placeholder="Hamis válasz 2"
            class="w-full bg-white/20 border-2 border-white/40 text-white text-xl rounded-xl px-4 py-3 outline-none placeholder-white/60 focus:border-cyan-400 focus:bg-white/30 transition"
          />
        </div>

        <div>
          <label
            class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
          >
            Hamis válasz 3
          </label>
          <input
            v-model="falseAnswer3"
            type="text"
            placeholder="Hamis válasz 3"
            class="w-full bg-white/20 border-2 border-white/40 text-white text-xl rounded-xl px-4 py-3 outline-none placeholder-white/60 focus:border-cyan-400 focus:bg-white/30 transition"
          />
        </div>

        <button
          @click="createCard"
          class="mt-6 bg-cyan-500 hover:bg-cyan-600 text-black text-4xl font-bold py-5 rounded-3xl border-4 border-white transition transform hover:scale-105 shadow-xl w-full"
          style="text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;"
        >
          Kártya létrehozása
        </button>
      </div>

      <button
        @click="goBack"
        class="mt-4 bg-black/40 hover:bg-black/60 text-white py-3 px-8 rounded-2xl shadow-lg text-lg transition"
      >
        Vissza
      </button>
    </div>
  </BaseLayout>
</template>