<template>
  <div class="copy-icon">
    <svg
      v-if="!copied"
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M2.6665 4.66667V12.6667C2.6665 13.403 3.26346 14 3.99984 14H9.99984M6.6665 11.3333H11.3332C12.0696 11.3333 12.6665 10.7364 12.6665 10V3.33333C12.6665 2.59695 12.0695 2 11.3332 2H6.6665C5.93012 2 5.33317 2.59695 5.33317 3.33333V10C5.33317 10.7364 5.93013 11.3333 6.6665 11.3333Z"
        stroke="white"
        stroke-width="1.33333"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>

    <!-- Галочка -->
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
    >
      <path
        d="M4 8L7 11L12 5"
        stroke="white"
        stroke-width="1.6"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</template>

<script setup>
import { ref } from "vue";

const copied = ref(false);

// Метод, який викликає батько
const startCopied = () => {
  copied.value = true;
  setTimeout(() => (copied.value = false), 1000);
};

defineExpose({ startCopied });
</script>

<style scoped>
.copy-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.2s ease;
}
</style>
