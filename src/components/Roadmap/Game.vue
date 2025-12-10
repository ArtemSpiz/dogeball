<script setup>
import CustomButton from "@/ui/CustomButton.vue";
</script>

<template>
  <div
    class="flex flex-col gap-14 max-md:gap-10 h-[590px] text-center justify-center items-center px-5 max-md:h-max max-md:py-12 bg-[center_bottom] bg-cover bg-no-repeat bg-[url('@/assets/img/Roadmap/GameBg.png')] max-md:bg-[url('@/assets/img/Roadmap/GameBgMob.png')]"
  >
    <div class="flex flex-col items-center gap-9 max-md:gap-7">
      <div class="flex flex-col items-center gap-8 max-md:gap-6">
        <div class="title">Game Starts Soon !</div>
        <div class="text-2xl font-medium leading-[80%] max-w-[900px]">
          Available to play shortly after presale starts - keep an eye on the
          official Telegram and X social media channels for launch news
        </div>
      </div>
      <CustomButton title="Coming Soon" class="w-full max-w-[200px]" />
    </div>

    <div
      class="rounded-2xl border max-w-[800px] decoration-from-font border-white bg-[rgba(0,0,0,0.36)] p-6 text-base font-medium leading-[125%]"
    >
      Users must enter the same wallet address as they have used to make presale
      purchases on completion of the game (the option to enter wallet address
      will be displayed if the game score is high enough to land on the
      leaderboard). Note to protect user privacy and security, wallet addresses
      <span class="textUnderline">WILL NOT</span> be visible on the website or
      mentioned in any social media channels; only the chosen username entered
      within the game itself will be mentioned.
    </div>
  </div>
</template>

<style scoped>
.textUnderline {
  text-decoration-line: underline;
  text-underline-position: from-font;
}
</style>
