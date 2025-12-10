<script setup>
import FeaturedImg from "@/assets/img/Home/FeaturedImg.png";
</script>

<template>
  <div
    class="h-[525px] max-md:h-[300px] w-full overflow-hidden flex justify-center pt-[70px] max-md:pt-[40px] bg-cover bg-bottom bg-no-repeat relative bg-[url('@/assets/img/Home/FeaturedBg.png')] max-md:bg-[url('@/assets/img/Home/FeaturedBgMob.png')]"
  >
    <div
      class="h-[400px] min-w-[500px] absolute bottom-[-20px] max-md:bottom-[-75px] right-1/2 translate-x-1/2 w-auto"
    >
      <img :src="FeaturedImg" class="object-contain" />
    </div>
    <div class="title">FEATURED IN</div>
  </div>
</template>

<style scoped></style>
