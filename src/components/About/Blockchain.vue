<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import BlockchainCenterLine from "@/assets/img/About/BlockchainCenterLine.png";
import { ref, onMounted, onUnmounted, reactive } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Copy from "@/assets/icons/Copy.vue";

gsap.registerPlugin(ScrollTrigger);

const { t } = useI18n();

const getTextWithButton = (key, buttonKey, buttonClass) => {
  const text = t(key);
  const buttonText = t(buttonKey);
  const buttonHtml = `<span class="${buttonClass}">${buttonText}</span>`;
  // Extract just the key name from "ethL2.connectWallet" -> "connectWallet"
  const keyName = buttonKey.split(".").pop();
  return text.replace(`{${keyName}}`, buttonHtml);
};

const getTextWithLink = (key, linkKey) => {
  const text = t(key);
  const linkText = t(linkKey);
  const linkHtml = `<span class="text-[#4FBBFF] underline">${linkText}</span>`;
  // Extract just the key name from "ethL2.here" -> "here"
  const keyName = linkKey.split(".").pop();
  return text.replace(`{${keyName}}`, linkHtml);
};

const BlockchainCards = computed(() => [
  {
    number: "1",
    text: t("ethL2.card1Text"),
    subtitles: [
      { name: t("ethL2.blockchainName"), data: "DOGECHAIN" },
      {
        name: t("ethL2.rpcUrl"),
        data: "http://78.141.225.190:10002",
        copy: true,
      },
      { name: t("ethL2.chainId"), data: "9010" },
      { name: t("ethL2.symbol"), data: "DOGEBALL" },
    ],
  },
  {
    number: "2",
    text: getTextWithButton(
      "ethL2.card2Text",
      "ethL2.connectWallet",
      "bg-[#EB4102] h-[17px] px-2 py-1 text-[9px] text-[#FFEEE1] rounded-[80px] items-center align-middle"
    ),
  },
  {
    number: "3",
    text: t("ethL2.card3Text"),
  },
  {
    number: "4",
    text: getTextWithButton(
      "ethL2.card4Text",
      "ethL2.send",
      "bg-[#EB4102] px-2 py-1 text-[9px] text-[#FFEEE1] rounded-[80px] items-center align-middle"
    ),
  },
  {
    number: "5",
    text: t("ethL2.card5Text"),
    text2: getTextWithLink("ethL2.card5Text2", "ethL2.here"),
  },
  {
    number: "6",
    text: t("ethL2.card6Text"),
  },
  {
    number: "7",
    text: t("ethL2.card7Text"),
  },
]);

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

const copyRefs = reactive({});

const handleCopy = (text, copyComponent) => {
  navigator.clipboard.writeText(text);

  if (copyComponent && copyComponent.startCopied) {
    copyComponent.startCopied();
  }
};

const blockchainDescription = computed(() => {
  const text = t("ethL2.blockchainDescription");
  return text.replace("ARE NOT", '<span class="underline">ARE NOT</span>');
});
</script>

<template>
  <div
    ref="sectionRef"
    class="pt-[130px] pb-[175px] bg-center max-md:py-20 px-5 flex flex-col gap-14 max-md:gap-8 bg-cover items-center text-center min-h-[500px] bg-no-repeat bg-[url('@/assets/img/About/BlockchainBg.png')]"
  >
    <div class="flex flex-col items-center gap-8 max-md:gap-6">
      <div class="title fade-sides max-w-[900px]">
        {{ t("ethL2.blockchainTitle") }}
      </div>
      <div class="flex flex-col gap-4 items-center">
        <div
          class="font-medium fade-sides-subtitle text-2xl leading-[80%] max-md:text-xl max-md:leading-[100%]"
        >
          {{ t("ethL2.blockchainSubtitle") }}
        </div>
        <div
          class="description max-w-[730px]"
          v-html="blockchainDescription"
        ></div>
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
          @click="
            sub.copy && handleCopy(sub.data, copyRefs[index + '-' + sub.name])
          "
        >
          <div class="gap-2 items-center text-start flex">
            <div class="w-[110px] description">{{ sub.name }}</div>
            <div
              :class="['', sub.copy ? 'cursor-pointer' : '']"
              class="w-max description flex items-center gap-1 px-2 py-1 text-sm leading-[120%] rounded-2xl border border-[#8B94F5] backdrop-blur-[5px] bg-[rgba(53,19,147,0.52)]"
            >
              {{ sub.data }}
              <Copy
                v-if="sub.copy"
                :ref="(el) => (copyRefs[index + '-' + sub.name] = el)"
              />
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
