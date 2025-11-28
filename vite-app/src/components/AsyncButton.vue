<script setup lang="ts">
import {ref} from 'vue';

const props = defineProps<{
  onClick: () => Promise<any>;
}>();

const isLoading = ref(false);

const handleClick = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  try {
    await props.onClick();
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <button
      type="button"
      @click="handleClick"
      :disabled="isLoading"
      class="w-full mt-3 py-3 px-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-emerald-700 disabled:opacity-75 disabled:cursor-not-allowed text-white font-medium rounded-md transition-colors duration-200 flex justify-center items-center gap-2"
  >
    <svg v-if="isLoading" class="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>

    <span v-if="!isLoading">
      <slot>Valider</slot>
    </span>
    <span v-else>
      Loading...
    </span>
  </button>
</template>