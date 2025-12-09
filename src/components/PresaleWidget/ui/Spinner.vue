<template>
  <div
    class="spinner-container inline-flex items-center justify-center"
    :style="{
      '--size': `${size / 4}rem`,
      height: `${size / 4}rem`,
      width: `${size / 4}rem`,
    }"
  >
    <svg
      class="spinner"
      viewBox="22 22 44 44"
      :style="{ height: 'var(--size)', width: 'var(--size)' }"
    >
      <circle
        cx="44"
        cy="44"
        r="20.2"
        fill="none"
        stroke-width="3.6"
        stroke="currentColor"
      />
    </svg>
  </div>
</template>

<script setup>
defineProps({
  size: {
    type: Number,
    default: 16,
  },
});
</script>

<style scoped>
.spinner-container {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.spinner {
  animation: spinner-rotate linear 1.4s infinite;
  display: inline-block;
}

@keyframes spinner-rotate {
  from {
    transform: rotateZ(0deg);
  }
  to {
    transform: rotateZ(360deg);
  }
}

.spinner-container circle {
  stroke-dasharray: 80px, 200px;
  stroke-dashoffset: 0;
  animation: spinner-indicator 1.4s infinite ease-in-out;
  stroke: currentColor;
}

@keyframes spinner-indicator {
  0% {
    stroke-dasharray: 1px, 200px;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -15px;
  }
  100% {
    stroke-dasharray: 100px, 200px;
    stroke-dashoffset: -125px;
  }
}
</style>

