<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import LeftClock from "@/assets/img/Home/LeftClock.png";
import RightClock from "@/assets/img/Home/RightClock.png";
import DigitCard from "./DigitCard.vue";

const days = ref("14");
const hours = ref("04");
const minutes = ref("02");
const seconds = ref("17");

let interval;

const updateCountdown = () => {
  const now = new Date().getTime();
  const targetDate = new Date("2025-12-22T23:59:59").getTime();
  const difference = targetDate - now;

  if (difference > 0) {
    days.value = String(
      Math.floor(difference / (1000 * 60 * 60 * 24))
    ).padStart(2, "0");
    hours.value = String(
      Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    ).padStart(2, "0");
    minutes.value = String(
      Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    ).padStart(2, "0");
    seconds.value = String(
      Math.floor((difference % (1000 * 60)) / 1000)
    ).padStart(2, "0");
  }
};

onMounted(() => {
  updateCountdown();
  interval = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  if (interval) clearInterval(interval);
});

const splitDigits = (value) => value.split("");
</script>

<template>
  <div
    class="mt-9 max-lg:mt-5 xl:h-[125px] max-md:mt-3 p-4 max-md:p-3 w-max flex items-center justify-center gap-4 backdrop-blur-[2px] rounded-2xl max-md:rounded-md border-2 border-white/20 shadow-[0_4px_4px_0_rgba(0,0,0,0.25)] max-md:h-[99px]"
  >
    <div class="flex gap-2">
      <div class="flex flex-col items-center">
        <div class="flex gap-1">
          <DigitCard
            v-for="(d, i) in splitDigits(days)"
            :key="i"
            :digit="d"
            :left="LeftClock"
            :right="RightClock"
          />
        </div>

        <div
          class="font-grotesk !leading-[120%] text-base max-md:text-sm mt-1 font-medium"
        >
          Days
        </div>
      </div>

      <div class="flex flex-col items-center">
        <div class="flex gap-1">
          <DigitCard
            v-for="(d, i) in splitDigits(hours)"
            :key="i"
            :digit="d"
            :left="LeftClock"
            :right="RightClock"
          />
        </div>

        <div
          class="font-grotesk !leading-[120%] text-base mt-1 max-md:text-sm font-medium"
        >
          Hours
        </div>
      </div>

      <div class="flex flex-col items-center">
        <div class="flex gap-1">
          <DigitCard
            v-for="(d, i) in splitDigits(minutes)"
            :key="i"
            :digit="d"
            :left="LeftClock"
            :right="RightClock"
          />
        </div>
        <div
          class="font-grotesk !leading-[120%] text-base mt-1 max-md:text-sm font-medium"
        >
          Minutes
        </div>
      </div>

      <div class="flex flex-col items-center">
        <div class="flex gap-1">
          <DigitCard
            v-for="(d, i) in splitDigits(seconds)"
            :key="i"
            :digit="d"
            :left="LeftClock"
            :right="RightClock"
          />
        </div>
        <div
          class="font-grotesk !leading-[120%] text-base mt-1 max-md:text-sm font-medium"
        >
          Seconds
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.digit-display {
  font-variant-numeric: ordinal;
  text-shadow: 0 0 3px #eb4102;
}
</style>
