<script setup lang="ts">
import {onMounted} from "vue";
import {useVisibility} from "../composables/useVisibility";
import {useNuiEvent} from "../composables/useNuiEvent";
import {isEnvBrowser} from "../helpers/misc";

const {visible, setVisible} = useVisibility();

useNuiEvent<boolean>("setVisible", (value) => {
  setVisible(value);
});

onMounted(()=> {
  if(!isEnvBrowser()) return
  setVisible(true);
})

</script>

<template>
  <div class="nui-wrapper" :style="{ visibility: visible ? 'visible' : 'hidden' }">
    <slot/>
  </div>
</template>

<style scoped>
.nui-wrapper {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>