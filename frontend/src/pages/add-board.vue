<script setup>
import BaseLayout from '@layouts/BaseLayout.vue'
import { randomColor } from '@utils/boardUtils.js'
import { useBoardStore } from '@stores/BoardStore.mjs'
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const title = ref('')
const imgURL = ref('')
var color = "#000000"

function createBoard() {
  if (!title.value) return alert('Title is required')

  const finalColor = color.toString() === '#000000' ? randomColor() : color.toString()
  const finalImgURL = imgURL.value === "" ? null : imgURL.value
  useBoardStore().addBoard(title.value, finalImgURL, finalColor)

  router.push({ name: 'index' })
}

</script>

<template>
  <BaseLayout>
  <h1 class="text-4xl my-6">Új Tábla Hozzáadása</h1>
    <div class="max-w-md bg-white p-6 rounded shadow space-y-4">
      <div>
        <label class="block mb-1 font-semibold">Tábla címe</label>
        <input v-model="title" type="text" placeholder="Tábla címe" class="w-full border rounded px-2 py-1">
      </div>
      <div>
        <label class="block mb-1 font-semibold">Kép URL</label>
        <input v-model="imgURL" type="text" placeholder="https://..." class="w-full border rounded px-2 py-1">
      </div>
      <div>
        <label class="block mb-1 font-semibold">Szín</label>
        <input v-model="color" type="color"/>
        <p class="text-sm text-gray-500">Ha nem választasz színt, véletlenszerűt kap.</p>
      </div>
      <button @click="createBoard()" class="bg-blue-500 text-white rounded py-2 px-4 w-full">
        Tábla létrehozása
      </button>
    </div>
  </BaseLayout>
</template>