<template>
  <div class="flex items-center justify-center min-h-screen p-6">
    <div class="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-xl p-8 shadow-2xl select-none">

      <button
          @click="closeInterface"
          class="absolute top-3 right-3 p-1.5 text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800 rounded-md transition-colors duration-200"
          title="Fermer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>

      <div class="flex justify-center items-center gap-8 mb-6">
        <a href="https://fivem.net/" target="_blank" class="group">
          <img
              src="../assets/default/cfx-rockstargame.png"
              draggable="false"
              class="h-8 w-auto select-none transition-[filter] duration-200 group-hover:drop-shadow-[0_0_24px_rgba(249,115,22,0.4)]"
              alt="FiveM logo"
              style="user-drag: none; -webkit-user-drag: none;"
          />
        </a>
      </div>

      <div class="flex items-center gap-4 mb-6">
        <div class="flex-1 h-px bg-zinc-800"></div>
        <span class="text-zinc-600 text-xs uppercase tracking-widest">Powered by</span>
        <div class="flex-1 h-px bg-zinc-800"></div>
      </div>

      <div class="flex justify-center mb-8">
        <img src="../assets/default/logo.svg" class="h-14 opacity-80 hover:opacity-100 transition-opacity duration-300" alt="Sensity*"/>
      </div>

      <h1 class="text-2xl font-semibold text-zinc-100 text-center mb-6 tracking-tight">
        {{ msg }}
      </h1>

      <div class="bg-zinc-900 border border-zinc-800 rounded-lg p-6 mb-6">
        <button
            type="button"
            @click="count++"
            class="w-full py-3 px-4 bg-zinc-100 hover:bg-white text-zinc-900 font-medium rounded-md transition-colors duration-200"
        >
          count is {{ count }}
        </button>

        <AsyncButton :on-click="fetchPlayerInfo">
          Retrieve player information
        </AsyncButton>

        <div v-if="playerInfo" class="mt-4 p-4 bg-zinc-800 border border-zinc-700 rounded-md space-y-2">
          <div class="flex justify-between text-sm">
            <span class="text-zinc-400">Health</span>
            <span class="text-emerald-400 font-mono">{{ playerInfo.health }}%</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-zinc-400">Armor</span>
            <span class="text-blue-400 font-mono">{{ playerInfo.armor }}%</span>
          </div>

          <div class="h-px bg-zinc-700 my-2"></div>

          <div class="text-xs text-zinc-500 uppercase tracking-wider mb-1">Position</div>
          <div class="grid grid-cols-3 gap-2 text-sm">
            <div class="text-center">
              <span class="text-zinc-500">X</span>
              <p class="text-zinc-200 font-mono text-xs">{{ playerInfo.position.x.toFixed(2) }}</p>
            </div>
            <div class="text-center">
              <span class="text-zinc-500">Y</span>
              <p class="text-zinc-200 font-mono text-xs">{{ playerInfo.position.y.toFixed(2) }}</p>
            </div>
            <div class="text-center">
              <span class="text-zinc-500">Z</span>
              <p class="text-zinc-200 font-mono text-xs">{{ playerInfo.position.z.toFixed(2) }}</p>
            </div>
          </div>

          <div class="h-px bg-zinc-700 my-2"></div>

          <div class="text-xs text-zinc-500 uppercase tracking-wider mb-1">Rotation</div>
          <div class="grid grid-cols-3 gap-2 text-sm">
            <div class="text-center">
              <span class="text-zinc-500">X</span>
              <p class="text-zinc-200 font-mono text-xs">{{ playerInfo.rotation.x.toFixed(0) }}°</p>
            </div>
            <div class="text-center">
              <span class="text-zinc-500">Y</span>
              <p class="text-zinc-200 font-mono text-xs">{{ playerInfo.rotation.y.toFixed(0) }}°</p>
            </div>
            <div class="text-center">
              <span class="text-zinc-500">Z</span>
              <p class="text-zinc-200 font-mono text-xs">{{ playerInfo.rotation.z.toFixed(0) }}°</p>
            </div>
          </div>
        </div>

        <p class="text-zinc-500 text-sm text-center mt-4">
          Edit <code class="text-emerald-400 bg-zinc-800 px-1.5 py-0.5 rounded text-xs">components/POC.vue</code> to test HMR
        </p>
      </div>

      <div class="space-y-3 text-sm text-zinc-400">
        <p class="text-center">
          Check out
          <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank" class="text-zinc-200 hover:text-white underline underline-offset-4 transition-colors">create-vue</a>, the official Vue + Vite starter
        </p>
      </div>
      <p class="text-zinc-600 text-xs text-center mt-6">
        Click on the Vue logo to learn more
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import AsyncButton from './AsyncButton.vue';
import {fetchNui} from "../composables/fetchNui";
import type {PlayerInfo} from '../interface/player';

const count = ref(0)
const playerInfo = ref<PlayerInfo | null>(null)

const closeInterface = async () => {
  const successClosed = await <boolean>fetchNui('closeInterface', {}, {}, 0);
  console.debug(`[x] interface is not ${successClosed}`)
}

const fetchPlayerInfo = async () => {
  const mockData: PlayerInfo = {
    health: 50.0,
    armor: 25.0,
    position: {x: 120.5, y: -50.2, z: 30.0},
    rotation: {x: 0.0, y: 0.0, z: 90.0}
  };

  try {
    const requestPlayerInfo = await fetchNui<PlayerInfo>('getPlayerStats', {}, mockData, 1500);
    playerInfo.value = requestPlayerInfo;
  } catch (e) {
    console.error(e);
  }
}
</script>