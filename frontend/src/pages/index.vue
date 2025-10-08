<script setup>
import { ref, onMounted } from 'vue'
import BaseLayout from '@layouts/BaseLayout.vue'
import { useCounter } from '@stores/CounterStore.mjs'
import axios from 'axios'

const counter = useCounter()
const boards = ref([])

onMounted(async () => {
  try {
    const res = await axios.get('http://quiztopia.bohoc.backend/api/list')
    console.log('Boards response:', res.data)
    // Fix: get boards from res.data.boards.data
    boards.value = res.data.boards?.data || []
  } catch (e) {
    console.error('Failed to fetch boards:', e)
    boards.value = []
  }
})
</script>

<template>
  <BaseLayout>
    <div class="overflow-x-auto py-8">
      <div class="flex gap-6 min-w-max">
        <div
          v-for="board in boards"
          :key="board.id"
          class="w-64 h-40 flex items-center justify-center rounded-lg shadow-lg text-white text-2xl font-bold"
          :style="{ backgroundColor: board.color || '#888' }"
        >
          <h3>{{ board.title }}</h3>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>