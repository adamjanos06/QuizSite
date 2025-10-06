import { defineStore } from 'pinia'
import axios from 'axios'
import { ref } from 'vue'

export const useBoardStore = defineStore('boards',{
  state(){
    return{boards:[]}
  },
  actions:{
    async addBoard(title, imgURL, color) {
      try {
        const payload = {
          title,
          imgURL,
          color
        }
        const response = await axios.post('http://quiztopia.bohoc.backend/api/boards', payload)
        this.boards.push(response.data.board)
      } catch (error) {
        console.error('Failed to add board:', error)
      }
    }
}
})