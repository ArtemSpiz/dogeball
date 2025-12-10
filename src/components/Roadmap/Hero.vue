<script setup>
import BgVideo from "@/assets/img/Roadmap/videoDog.mp4";
import BgPoster from "@/assets/img/Roadmap/BgHero.png";
import Seats from "@/assets/img/Roadmap/SeatsHero.png";
</script>

<template>
  <div
    class="relative px-5 h-screen items-center pt-[120px] max-[400px]:bg-contain max-md:pt-[100px] text-center min-h-[500px] flex flex-col bg-[center_bottom] bg-cover bg-no-repeat bg-[url('@/assets/img/Roadmap/BgHero.png')] max-[400px]:bg-[url('@/assets/img/Roadmap/BgHeroMob.png')]"
  >
    <div
      class="absolute bottom-[140px] max-[400px]:px-5 max-[400px]:bottom-[200px] right-1/2 translate-x-1/2 w-full 2xl:max-w-[1600px] 2xl:max-h-[800px] max-w-[915px] h-full max-h-[400px] max-md:max-h-[500px] max-[400px]:max-h-[180px] max-md:bottom-0 z-[1] pointer-events-none overflow-hidden rounded-md"
    >
      <div
        class="absolute inset-0 z-[2] bg-gradient-to-t from-[#00000060] via-[#00000010] to-transparent pointer-events-none"
      ></div>

      <div
        class="absolute inset-0 z-[3] pointer-events-none"
        style="
          mask-image: linear-gradient(
            to bottom,
            transparent 0%,
            black 20%,
            black 80%,
            transparent 100%
          );
        "
      ></div>

      <video
        class="w-full h-full object-fill max-md:object-cover"
        :src="BgVideo"
        :poster="BgPoster"
        autoplay
        muted
        playsinline
        loop
        preload="auto"
      />
    </div>

    <div
      class="w-full h-auto absolute bottom-0 z-10 right-1/2 translate-x-1/2 min-w-[1200px] max-md:min-w-[600px]"
    >
      <img :src="Seats" class="object-contain w-full" />
    </div>

    <div
      class="title max-w-[700px] max-sm:max-w-[300px] text-[32px] max-sm:text-[22px] z-30"
    >
      WELCOME TO THE DOGEBALL GAME!
    </div>
  </div>
</template>
