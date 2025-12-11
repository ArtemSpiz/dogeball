<script setup>
import FeaturedImg from "@/assets/img/Home/FeaturedImg.png";
import FeaturedBalls from "@/assets/img/Home/FeaturedBalls.png";
import FeaturedBallsMob from "@/assets/img/Home/FeaturedBallsMob.png";

const isMobile = window.innerWidth < 768;
</script>

<template>
  <div
    class="h-[500px]  2xl:h-[700px] max-md:h-[430px] max-sm:h-[330px] w-full overflow-hidden flex justify-center pt-[70px] max-md:pt-[40px] bg-cover bg-bottom bg-no-repeat relative bg-[url('@/assets/img/Home/FeaturedBg.png')] max-md:bg-[url('@/assets/img/Home/FeaturedBgMob.png')]"
  >
    <div
      class="h-auto w-full max-w-[900px] max-md:min-w-[550px] absolute bottom-0 max-md:bottom-[30px] right-1/2 translate-x-1/2"
    >
      <img :src="FeaturedImg" class="object-contain" />
    </div>

    <div class="w-full h-auto absolute bottom-0 right-0 z-10 max-md:max-h-[600px]">
      <img
        :src="isMobile ? FeaturedBallsMob : FeaturedBalls"
        class="object-contain"
      />
    </div>
    <div class="title">FEATURED IN</div>
  </div>
</template>

<style scoped></style>
