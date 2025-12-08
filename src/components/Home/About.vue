<script setup>
import AboutIcon1 from "@/assets/img/Home/AboutIcon1.png";
import AboutIcon2 from "@/assets/img/Home/AboutIcon2.png";
import AboutIcon3 from "@/assets/img/Home/AboutIcon3.png";
import AboutIcon4 from "@/assets/img/Home/AboutIcon4.png";
import AboutIcon5 from "@/assets/img/Home/AboutIcon5.png";
import CustomButton from "@/ui/CustomButton.vue";

const AboutCards = [
  {
    icon: AboutIcon1,
    title: "$DOGEBALL online-game, play to win part of $1m!",
  },
  {
    icon: AboutIcon2,
    title: "Custom built ETH L2 Blockchain with ultra-low user fees",
  },
  {
    icon: AboutIcon3,
    title: "Lightning-fast transactions, powering the future of online gaming",
  },
  {
    icon: AboutIcon4,
    title: "High-yield staking at 80%",
  },
  {
    icon: AboutIcon5,
    title: "Pure fun guaranteed!",
  },
];
</script>

<template>
  <div
    class="flex flex-col gap-9 pt-[80px] pb-[120px] justify-center items-center px-[100px] max-lg:px-11 max-md:px-5 bg-[url('@/assets/img/Home/AboutBg.png')] bg-cover bg-bottom bg-no-repeat"
  >
    <div class="flex flex-col items-center gap-8">
      <div class="title">ABOUT</div>
      <div class="flex items-center text-center flex-col gap-4">
        <div class="font-grotesk text-2xl font-medium">
          The transition of crypto meme-coins
        </div>
        <div class="description max-w-[730px]">
          At the centre of DOGECHAIN is the $DOGEBALL game — an addictive online
          dodgeball game where players throw DOGEBALLs, level up, climb the
          leaderboard and compete for a $1M prize pool ($500k to the top
          player)!
        </div>
      </div>
    </div>
    <div class="flex flex-wrap gap-4 items-center justify-center">
      <div
        v-for="(card, i) in AboutCards"
        :key="i"
        class="px-8 py-4 min-w-[310px] h-[120px] self-stretch gap-4 flex flex-col items-center justify-center bg-[rgba(53,19,147,0.52)] border border-[#8B94F5] rounded-2xl backdrop-blur-[5px]"
      >
        <div class="w-6 h-6 p-1 bg-[#FFEEE1] rounded-full">
          <img :src="card.icon" />
        </div>

        <div
          class="font-grotesk leading-[110%] text-lg font-medium max-w-[300px] text-center"
        >
          {{ card.title }}
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-3 items-center text-center justify-center">
      <div class="description max-w-[420px]">
        Unlike other meme-coins L2s, you can test our custom built DOGECHAIN and
        experience yourself the king of all L2s!
      </div>
      <CustomButton title="Click Here" class="w-full max-w-[200px]" />

      <div
        class="font-grotesk text-xs font-medium max-w-[730px] leading-[160%]"
      >
        Partnerships with the world's largest gaming organisations are in
        progress
      </div>
    </div>
  </div>
</template>

<style scoped></style>
