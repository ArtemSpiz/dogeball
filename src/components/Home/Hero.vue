<script setup>
import CustomButton from "@/ui/CustomButton.vue";
import TimerCounter from "./TimerCounter.vue";
import Circle from "@/assets/img/Home/CircleText.png";
</script>

<template>
  <div
    class="h-screen relative min-h-[600px] px-5 pt-[100px] flex flex-col items-center justify-between pb-[56px] bg-[url('@/assets/img/Home/HeroBg.png')] bg-cover bg-[center_bottom] bg-no-repeat"
  >
    <div class="text-center flex flex-col items-center justify-center w-full">
      <div class="title max-w-[800px]">
        THE WORLD'S FIRST L2 POWERED CRYPTO GAME
      </div>
      <div class="description max-w-[470px] mt-4">
        $DOGEBALL, the only crypto-playing DOGE on a customer EVM L2 blockchain.
        Fast, cheap, secure. Play for a shot at $1M
      </div>
      <TimerCounter />
    </div>

    <div
      class="flex absolute bottom-[56px] left-[120px] max-xl:left-[20px] max-lg:hidden w-full max-w-[325px] flex-col p-4 gap-4 border border-[#8B94F5] rounded-2xl bg-[rgba(53,19,147,0.52)] backdrop-blur-[5px] shadow-[0_0_154px_0_#263166]"
    >
      <div>
        <div class="text-sm leading-[140%] font-grotesk">
          Enter email to be added to the Whitelist
        </div>
        <input
          class="py-1 w-full px-2 h-10 border border-[#DCDCDC] rounded-lg bg-[rgba(255,255,255,0.06)] text-base font-medium text-[rgba(255,255,255,0.30)]"
          placeholder="your email"
        />
      </div>
      <CustomButton title="Get early access!" class="w-full" />
    </div>

    <div class="flex gap-4 items-center">
      <CustomButton title="Audit" class="py-[18px] !text-[22px] !w-[160px]" />
      <CustomButton
        title="Whitepaper"
        white-bg="true"
        class="py-[18px] !text-[22px] !w-[160px]"
      />
    </div>

    <div
      class="w-[230px] max-md:w-[200px] absolute bottom-[56px] max-lg:bottom-[250px] max-md:top-[370px] max-md:bottom-auto right-[120px] max-md:right-[10px] aspect-square"
    >
      <img :src="Circle" class="object-contain animate-rotateClockwise" />
    </div>
  </div>
</template>

<style scoped></style>
