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
</script>

<template>
  <BaseLayout>
    <h1 class="text-4xl my-6">Új Kártya Hozzáadása</h1>
    <div class="max-w-md bg-white p-6 rounded shadow space-y-4">
      <div v-if="successMessage" class="bg-green-100 text-green-800 p-2 rounded mb-2">
        {{ successMessage }}
      </div>
      <div>
        <label class="block mb-1 font-semibold">Kérdés</label>
        <input v-model="question" type="text" placeholder="Kérdés" class="w-full border rounded px-2 py-1">
      </div>
      <div>
        <label class="block mb-1 font-semibold">Helyes válasz</label>
        <input v-model="correctAnswer" type="text" placeholder="Helyes válasz" class="w-full border rounded px-2 py-1">
      </div>
      <div>
        <label class="block mb-1 font-semibold">Hamis válasz 1</label>
        <input v-model="falseAnswer1" type="text" placeholder="Hamis válasz 1" class="w-full border rounded px-2 py-1">
      </div>
      <div>
        <label class="block mb-1 font-semibold">Hamis válasz 2</label>
        <input v-model="falseAnswer2" type="text" placeholder="Hamis válasz 2" class="w-full border rounded px-2 py-1">
      </div>
      <div>
        <label class="block mb-1 font-semibold">Hamis válasz 3</label>
        <input v-model="falseAnswer3" type="text" placeholder="Hamis válasz 3" class="w-full border rounded px-2 py-1">
      </div>
      <button @click="createCard()" class="bg-blue-500 text-white rounded py-2 px-4 w-full">
        Kártya létrehozása
      </button>
    </div>
  </BaseLayout>
</template>