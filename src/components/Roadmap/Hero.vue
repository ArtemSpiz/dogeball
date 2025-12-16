<script setup>
import BgVideo from "@/assets/img/Roadmap/videoDog.mp4";
import BgPoster from "@/assets/img/Roadmap/BgHero.png";
import Seats from "@/assets/img/Roadmap/SeatsHero.png";
</script>

<template>
  <div
    class="relative 2xl:min-h-[1240px] px-5 h-screen max-md:h-[500px] items-center pt-[120px] max-[400px]:bg-contain max-md:pt-[100px] text-center min-h-[500px] flex flex-col bg-[center_bottom] bg-cover bg-no-repeat bg-[url('@/assets/img/Roadmap/BgHero.png')] max-[400px]:bg-[url('@/assets/img/Roadmap/BgHeroMob.png')]"
  >
    <!-- Video container -->
    <div
      class="absolute w-full h-full max-w-[1025px] bottom-[120px] max-h-[515px] 2xl:max-h-[1050px] 2xl:max-w-[1820px] 2xl:h-[62%] max-xl:h-[370px] max-[400px]:px-4 max-[400px]:bottom-[130px] max-md:w-screen max-md:max-w-[800px] max-md:max-h-[350px] max-[400px]:max-h-[180px] max-md:bottom-0 z-[1] overflow-hidden rounded-md right-1/2 translate-x-1/2"
    >
      <!-- Wrapper for object-fill behavior -->
      <div class="absolute inset-0 w-full h-full">
        <iframe
          src="https://player.vimeo.com/video/1147054834?h=e62c5467b8&autoplay=1&loop=1&muted=0&autopause=1&background=1&controls=0&playsinline=1"
          frameborder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          class="w-full h-full"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
        ></iframe>
      </div>

      <!-- Gradient overlay -->
      <div
        class="absolute inset-0 z-[2] bg-gradient-to-t from-[#00000060] via-[#00000010] to-transparent pointer-events-none"
      ></div>
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
