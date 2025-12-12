<template>
  <div
    class="flex flex-col justify-center items-center gap-3 rounded-2xl border border-white/20 bg-white/10 shadow-[0_0_14px_0_#5464D8] backdrop-blur-sm px-4 py-4 w-full max-w-[519px]"
  >
    <p
      class="text-white text-center font-semibold text-lg leading-[90%] m-0 font-grotesk"
    >
      Presale Launch Offer
    </p>

    <div class="flex flex-wrap items-center justify-center gap-2 w-full">
      <p
        class="text-white text-center text-sm leading-tight m-0 whitespace-nowrap font-grotesk"
      >
        Use Bonus Code
      </p>
      <button
        @click="copyBonusCode"
        class="inline-flex font-grotesk items-center justify-center gap-1 px-2 font-black rounded-md bg-white text-[#080C23] text-sm leading-tight cursor-pointer transition-opacity hover:opacity-90 whitespace-nowrap font-grotesk"
        title="Copy code"
      >
        {{ copied ? "Copied!" : BONUS_CODE }}
        <CopyIcon v-if="!copied" :size="16" color="#EB4102" />
        <CheckIcon v-else :size="16" />
      </button>
      <p
        class="text-white text-center text-sm leading-tight m-0 whitespace-nowrap font-grotesk"
      >
        To Get 10% More $DOGEBALL tokens!
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { CopyIcon, CheckIcon } from "../icons";

const BONUS_CODE = "DOGEBALL10";
const copied = ref(false);

const copyBonusCode = async () => {
  try {
    await navigator.clipboard.writeText(BONUS_CODE);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    // Fallback for older browsers
    const textArea = document.createElement("textarea");
    textArea.value = BONUS_CODE;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  }
};
</script>
