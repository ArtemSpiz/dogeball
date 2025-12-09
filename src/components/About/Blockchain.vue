<script setup>
import BlockchainCenterLine from "@/assets/img/About/BlockchainCenterLine.png";
import { ref, onMounted, onUnmounted } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const BlockchainCards = [
  {
    number: "01",
    text: "Add ETH L2 DOGECHAIN custom network to your chosen wallet (refer to your chosen wallets website for details on how to add a custom network) using the below details:",
    subtitles: [
      { name: "Blockchain Name", data: "DOGECHAIN" },
      { name: "RPC URL", data: "http://78.141.225.190:10002" },
      { name: "Chain ID", data: "9010" },
      { name: "Symbol", data: "DOGEBALL" },
    ],
  },
  {
    number: "02",
    text: `Click <span class="bg-[#EB4102] px-2 py-1 text-[9px] text-[#FFEEE1] rounded-[80px]">Connect Wallet</span> button at the top of the page to connect your wallet. Your wallet address will automatically populate in the faucet below`,
  },
  {
    number: "03",
    text: "Select the amount of test tokens to use (max 0.01 $DOGEBALL test tokens can be claimed using the same wallet per 24 hour period)",
  },
  {
    number: "04",
    text: `Click the  <span class="bg-[#EB4102] px-2 py-1 text-[9px] text-[#FFEEE1] rounded-[80px]">Send</span> button below to claim your free $DOGEBALL test tokens from the faucet`,
  },
  {
    number: "05",
    text: "Wait for the transaction to complete - the tokens will appear in your wallet on the DOGECHAIN network.",
    text2: `See all transactions and blockchain activity for our DOGECHAIN <span class="text-[#4FBBFF] underline" >Here</span>`,
  },
  {
    number: "06",
    text: "Test the blockchain by sending $DOGEBALL test tokens to other wallet addresses (note the receiving wallet must also have the DOGECHAIN custom network added to their wallet to receive the test tokens)",
  },
  {
    number: "07",
    text: "And there you go, you have experienced the speed, zero-cost and security of the custom created DOGECHAIN ETH L2 Blockchain!",
  },
];

const sectionRef = ref(null);
const cardsContainer = ref(null);

onMounted(() => {
  if (window.innerWidth >= 768) return;

  const cards = gsap.utils.toArray(".process-card");

  gsap.set(cards, (card, i) => ({
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: cards.length - i,
  }));

  ScrollTrigger.create({
    trigger: cardsContainer.value,
    start: "top top",
    end: "+=300%",
    pin: sectionRef.value,
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      const totalCards = cards.length;

      cards.forEach((card, i) => {
        if (i === 0) return;

        const segmentStart = (i - 1) / (totalCards - 1);
        const segmentEnd = i / (totalCards - 1);

        let cardProgress =
          (progress - segmentStart) / (segmentEnd - segmentStart);
        cardProgress = Math.min(Math.max(cardProgress, 0), 1);

        const offset = -(cards[0].offsetHeight - 240) * i;
        gsap.to(card, {
          y: offset * cardProgress,
          ease: "none",
          overwrite: "auto",
        });
      });
    },
  });
});

onUnmounted(() => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
});
</script>

<template>
  <div
    ref="sectionRef"
    class="pt-[130px] pb-[175px] bg-center max-md:py-20 px-5 flex flex-col gap-14 max-md:gap-8 bg-cover items-center text-center min-h-[500px] bg-no-repeat bg-[url('@/assets/img/About/BlockchainBg.png')]"
  >
    <div class="flex flex-col items-center gap-8 max-md:gap-6">
      <div class="title fade-sides max-w-[900px]">
        Get $DOGEBALL Blockchain Test Tokens
      </div>
      <div class="flex flex-col gap-4 items-center">
        <div
          class="font-medium fade-sides-subtitle text-2xl leading-[80%] max-md:text-xl max-md:leading-[100%]"
        >
          $DOGEBALL Blockchain Test Tokens are free and do not cost the user any
          crypto/cash
        </div>
        <div class="description max-w-[730px]">
          Every 24 hours, $DOGEBALL Blockchain Test tokens can be claimed by the
          same wallet (note these tokens
          <span class="underline">ARE NOT</span> the tokens users purchase
          during the presale; these tokens have been created for users to try
          during the presale only and have no token value)
        </div>
      </div>
    </div>

    <div
      class="relative flex flex-col gap-0 max-md:gap-4 justify-center items-center max-w-[900px] w-full max-md:justify-start max-md:h-[800px] max-md:overflow-hidden"
      ref="cardsContainer"
    >
      <div
        class="absolute bottom-[-40px] right-1/2 max-md:hidden translate-x-1/2 w-[143px] h-auto"
      >
        <img :src="BlockchainCenterLine" class="object-contain" />
      </div>

      <div
        v-for="(card, index) in BlockchainCards"
        :key="index"
        :class="[
          'border max-w-[400px] process-card mb-[-40px] max-md:mb-0 max-lg:max-w-[360px]  w-full text-start border-white backdrop-blur-[5px] rounded-2xl flex flex-col gap-4 p-8 max-lg:p-4 bg-[rgba(255,255,255,0.06)]',
          index % 2 === 0
            ? 'md:self-start md:mr-auto'
            : 'md:self-end md:ml-auto',
        ]"
      >
        <div
          class="w-8 h-8 min-w-[32px] bg-[#FFEEE1] rounded-full flex items-center justify-center text-[#EB4102] font-semibold text-base leading-[120%]"
        >
          {{ card.number }}
        </div>

        <p v-html="card.text" class="description"></p>

        <p v-html="card.text2" v-if="card.text2" class="description"></p>

        <div
          v-if="card.subtitles"
          v-for="sub in card.subtitles"
          class="flex flex-col gap-2"
        >
          <div class="gap-2 items-start text-start flex">
            <div class="w-[110px] description">{{ sub.name }}</div>
            <div
              class="w-max description px-2 py-1 text-sm leading-[120%] rounded-2xl border border-[#8B94F5] backdrop-blur-[5px] bg-[rgba(53,19,147,0.52)]"
            >
              {{ sub.data }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fade-sides {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 30%,
    black 70%,
    transparent
  );
}

.fade-sides-subtitle {
  mask-image: linear-gradient(
    to right,
    transparent,
    black 10%,
    black 90%,
    transparent
  );
}

@media (max-width: 1024px) {
  .fade-sides,
  .fade-sides-subtitle {
    mask-image: none;
    -webkit-mask-image: none;
  }
}
</style>
