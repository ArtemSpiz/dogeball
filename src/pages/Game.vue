<template>
  <div class="game-container">
    <iframe
      src="/game.html"
      class="game-iframe"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
import { onMounted } from "vue";

onMounted(() => {
  // Check if device is mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth <= 768;
  
  // Enable fullscreen on first click/tap only for mobile devices
  if (isMobile) {
    document.body.addEventListener("click", () => {
      document.documentElement.requestFullscreen().catch(() => {});
    }, { once: true });
  }
});
</script>

<style scoped>
.game-container {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100vh;
  width: 100vw;
}

.game-iframe {
  width: 100vw;
  height: 100vh;
  border: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

/* Landscape orientation message for mobile */
@media screen and (orientation: portrait) {
  .game-container::before {
    content: "Rotate your device to play!";
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2em;
    text-align: center;
    color: white;
    background: black;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 9999;
  }
}
</style>
