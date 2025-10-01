import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useBoardStore = defineStore('boards', () => {
  const boards = ref([])

  function addBoard({ title, imgURL, color }) {
    boards.value.push({
      title,
      imgURL,
      color: color || randomColor()
    })
  }

  return { boards, addBoard }
})
