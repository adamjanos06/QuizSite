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
function GoBack() {
  window.location.href = `http://quiztopia.bohoc.quizgame/`
}
</script>

<template>
  <BaseLayout>
    <section class="flex flex-col items-center justify-center py-20 text-white font-[Jersey_10]">
      <h1
        class="text-5xl md:text-6xl mb-10 text-center drop-shadow-[0_3px_5px_rgba(0,0,0,0.8)] tracking-wider"
      >
        Kategória hozzáadása
      </h1>
      <div
        class="w-full max-w-lg bg-white/10 backdrop-blur-xl border-2 border-white/30 rounded-3xl shadow-2xl p-10 flex flex-col gap-6"
      >
        <div>
          <label
            class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
          >
            Kategória neve
          </label>
          <input
            v-model="title"
            type="text"
            placeholder="Pl. Történelem"
            class="w-full bg-white/20 border-2 border-white/40 text-white text-xl rounded-xl px-4 py-3 outline-none placeholder-white/60 focus:border-cyan-400 focus:bg-white/30 transition"
          />
        </div>

        <div>
          <label
            class="block text-2xl mb-2 text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
          >
            Kép URL
          </label>
          <input
            v-model="imgURL"
            type="text"
            placeholder="https://..."
            class="w-full bg-white/20 border-2 border-white/40 text-white text-xl rounded-xl px-4 py-3 outline-none placeholder-white/60 focus:border-cyan-400 focus:bg-white/30 transition"
          />
        </div>

        <div class="flex flex-col items-start gap-3">
          <label
            class="block text-2xl text-white drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)]"
          >
            Szín
          </label>
          <input
            v-model="color"
            type="color"
            class="w-32 h-14 rounded-xl border-2 border-white/40 cursor-pointer bg-white/20 hover:bg-white/30 transition"
          />
          <p class="text-white/80 text-lg italic">
            Ha nem választasz színt, véletlenszerű lesz.
          </p>
        </div>

        <button
          @click="createBoard"
          class="mt-6 bg-cyan-500 hover:bg-cyan-600 text-black text-4xl font-bold py-5 rounded-3xl border-4 border-white transition transform hover:scale-105 shadow-xl"
          style="text-shadow: -2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff;"
        >
          Kategória létrehozása
        </button>
      </div>

      <button
        @click="GoBack"
        class="mt-4 bg-black/40 hover:bg-black/60 text-white py-3 px-8 rounded-2xl shadow-lg text-lg transition"
      >
        Vissza a főoldalra
      </button>
    </section>
  </BaseLayout>
</template>