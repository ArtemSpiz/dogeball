<script setup>
import FeaturedImg from "@/assets/img/Home/FeaturedImg.png";
</script>

<template>
  <div
    class="h-[515px] w-full overflow-hidden flex justify-center pt-[70px] bg-cover bg-bottom bg-no-repeat relative bg-[url('@/assets/img/Home/FeaturedBg.png')]"
  >
    <div
      class="h-[400px] absolute bottom-[-20px] right-1/2 translate-x-1/2 w-auto"
    >
      <img :src="FeaturedImg" class="object-contain" />
    </div>
    <div class="title">FEATURED IN</div>
  </div>
</template>

<style scoped></style>
