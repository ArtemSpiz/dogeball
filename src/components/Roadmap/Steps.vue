<script setup>
import Star from "@/assets/icons/Star.vue";
import BgSteps from "@/assets/icons/BgSteps.vue";

const StepsContent = [
  {
    title: "Score big!",
  },
  {
    title: "Climb the ranks!",
  },
  {
    title: "Become the ultimate DOGEBALL champion!",
  },
];
</script>

<template>
  <div
    class="flex flex-col gap-8 h-[590px] justify-center items-center px-5 max-md:h-max max-md:py-12 bg-[center_bottom] bg-cover bg-no-repeat bg-[url('@/assets/img/Roadmap/StepsBg.png')]"
  >
    <div
      class="max-w-[710px] text-center text-[32px] max-md:text-xl !leading-[110%] font-medium"
    >
      Step into the arena and show your aim! Tap or click to throw – time it
      right, and smash every target in your way!
    </div>

    <div class="flex flex-col items-end gap-2">
      <div
        class="flex items-center self-stretch gap-2 justify-end max-lg:flex-wrap max-lg:items-center max-md:justify-center"
      >
        <div
          v-for="(step, i) in StepsContent"
          :key="i"
          class="relative p-2 font-medium text-sm flex items-center gap-1 rounded-2xl bg-[rgba(255,255,255,0.06)] backdrop-blur-sm overflow-hidden"
        >
          <div
            class="absolute inset-0 rounded-2xl"
            style="
              background: linear-gradient(
                145deg,
                rgba(255, 255, 255, 0.6) 0%,
                rgba(255, 255, 255, 0.1) 40%,
                rgba(255, 255, 255, 0.6) 100%
              );
              -webkit-mask: linear-gradient(#fff 0 0) content-box,
                linear-gradient(#fff 0 0);
              -webkit-mask-composite: xor;
              mask-composite: exclude;
              padding: 1px;
            "
          ></div>
          <Star />
          {{ step.title }}
        </div>
      </div>

      <div class="absolute max-md:hidden">
        <BgSteps class="w-full pl-5" />
      </div>

      <div
        class="p-6 relative flex flex-col text-center max-w-[800px] items-center gap-2 rounded-2xl max-md:bg-[rgba(255,255,255,0.06)] max-md:backdrop-blur-sm"
      >
        <div
          class="absolute inset-0 md:hidden rounded-2xl"
          style="
            background: linear-gradient(
              145deg,
              rgba(255, 255, 255, 0.6) 0%,
              rgba(255, 255, 255, 0.1) 40%,
              rgba(255, 255, 255, 0.6) 100%
            );
            -webkit-mask: linear-gradient(#fff 0 0) content-box,
              linear-gradient(#fff 0 0);
            -webkit-mask-composite: xor;
            mask-composite: exclude;
            padding: 1px;
          "
        ></div>
        <div class="font-medium text-sm">
          Each hit gives you points, and combos raise your score sky-high! But
          be careful – miss too many throws, and it's GAME OVER. Level up to
          unlock different backgrounds and arenas, all adding to the game
          experience.
        </div>
        <div class="font-medium text-sm">
          Enemies get faster and tougher, and get distanced as you level up.
          Only the sharpest and most accurate players can reach the TOP 10
          Leaderboard, where the winner will receive the $500k jackpot of
          $DOGEBALL tokens, with another $500k prize pot split between the
          remaining 9 players. Note that only users who have purchased tokens in
          the $DOGEBALL presale are eligible to be part of the $1M PRIZE POT.
        </div>
      </div>
    </div>
  </div>
</template>
