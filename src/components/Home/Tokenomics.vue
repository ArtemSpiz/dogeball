<script setup>
import Copy from "@/assets/icons/Copy.vue";
import { reactive, ref } from "vue";
import TokenomicsImg1 from "@/assets/img/Home/TokenomicsImg1.png";
import TokenomicsImg2 from "@/assets/img/Home/TokenomicsImg2.png";
import TokenomicsImg3 from "@/assets/img/Home/TokenomicsImg3.png";
import TokenomicsImg4 from "@/assets/img/Home/TokenomicsImg4.png";
import TokenomicsImg5 from "@/assets/img/Home/TokenomicsImg5.png";
import TokenomicsImg6 from "@/assets/img/Home/TokenomicsImg6.png";
import TokenomicsLineLeft from "@/assets/img/Home/TokenomicsLineLeft.png";
import TokenomicsLineRight from "@/assets/img/Home/TokenomicsLineRight.png";

const copyRefs = reactive({});

const handleCopy = (text, copyComponent) => {
  navigator.clipboard.writeText(text);

  if (copyComponent && copyComponent.startCopied) {
    copyComponent.startCopied();
  }
};

const data = "0x57f67ed05631a83c5e3300e28e4d1867a9c9db6a";

const TokenomicsCards = [
  {
    percents: "10%",
    name: "Development",
    price: "8,000,000,000",
    image: TokenomicsImg1,
    color: "#69200A",
    percent: 10,
    startAngle: 324,
  },
  {
    percents: "25%",
    name: "Presale",
    price: "20,000,000,000",
    image: TokenomicsImg2,
    color: "#FA7B55",
    percent: 25,
    startAngle: 0,
  },
  {
    percents: "10%",
    name: "Treasury Reserves",
    price: "8,000,000,000",
    image: TokenomicsImg3,
    color: "#942B0C",
    percent: 10,
    startAngle: 288,
  },
  {
    percents: "15%",
    name: "Staking & Games Rewards",
    price: "12,000,000,000",
    image: TokenomicsImg4,
    color: "#F45525",
    percent: 15,
    startAngle: 90,
  },
  {
    percents: "25%",
    name: "Marketing",
    price: "20,000,000,000",
    image: TokenomicsImg5,
    color: "#BA320A",
    percent: 25,
    startAngle: 198,
  },
  {
    percents: "15%",
    name: "Liquidity",
    price: "12,000,000,000",
    image: TokenomicsImg6,
    color: "#E53501",
    percent: 15,
    startAngle: 144,
  },
];

const createSegmentPath = (percent, startAngle) => {
  const angle = (percent / 100) * 360;
  const endAngle = startAngle + angle;

  const startRad = ((startAngle - 90) * Math.PI) / 180;
  const endRad = ((endAngle - 90) * Math.PI) / 180;

  const outerRadius = 45;
  const innerRadius = 25;

  const x1 = 50 + outerRadius * Math.cos(startRad);
  const y1 = 50 + outerRadius * Math.sin(startRad);
  const x2 = 50 + outerRadius * Math.cos(endRad);
  const y2 = 50 + outerRadius * Math.sin(endRad);

  const x3 = 50 + innerRadius * Math.cos(endRad);
  const y3 = 50 + innerRadius * Math.sin(endRad);
  const x4 = 50 + innerRadius * Math.cos(startRad);
  const y4 = 50 + innerRadius * Math.sin(startRad);

  const largeArc = angle > 180 ? 1 : 0;

  return `
    M ${x1} ${y1}
    A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x2} ${y2}
    L ${x3} ${y3}
    A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x4} ${y4}
    Z
  `;
};

const hoverIndex = ref(null);
</script>

<template>
  <div
    class="flex flex-col max-2xl:!bg-cover bgFill relative items-center justify-center gap-10 max-md:gap-8 py-20 max-md:py-12 bg-[url('@/assets/img/Home/TokenomicsBg.png')] max-md:bg-[url('@/assets/img/Home/TokenomicsBgMob.png')] bg-[100%,100%] max-lg:bg-cover bg-[center_bottom] bg-no-repeat"
  >
    <div class="flex flex-col text-center items-center gap-8">
      <div class="title">TOKENOMICS</div>
      <div class="flex flex-col items-center gap-4 max-md:gap-2">
        <div
          class="text-2xl font-medium leading-[110%] max-lg:text-xl max-md:text-sm"
        >
          Contract Address
        </div>
        <div
          @click="data && handleCopy(data, copyRefs[index + '-' + data])"
          class="bg-[rgba(53,19,147,0.52)] cursor-pointer relative backdrop-blur-sm rounded-2xl p-4 flex items-center gap-2 max-sm:p-2 max-md:text-xs max-md:gap-1"
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
          {{ data }}
          <Copy :ref="(el) => (copyRefs[index + '-' + data] = el)" />
        </div>
      </div>
    </div>

    <div
      class="relative w-full max-xl:h-auto max-w-[650px] max-xl:max-w-[350px] aspect-square max-md:w-auto max-md:aspect-auto"
    >
      <svg
        viewBox="0 0 100 100"
        class="w-full h-full aspect-square mx-auto max-w-[480px] max-xl:h-auto max-xl:max-w-[350px] max-md:hidden"
      >
        <path
          v-for="(segment, index) in TokenomicsCards"
          :key="index"
          :d="createSegmentPath(segment.percent, segment.startAngle)"
          :fill="segment.color"
          stroke="#1a0b3f"
          stroke-width="0.3"
          class="origin-center transition-all duration-300"
          :class="{
            'scale-[1.08]': hoverIndex === index,
          }"
          @mouseenter="hoverIndex = index"
          @mouseleave="hoverIndex = null"
        />
      </svg>

      <div
        class="absolute items-center top-1/2 right-1/2 translate-x-1/2 flex flex-col gap-2 -translate-y-1/2 max-md:static max-md:translate-x-0 max-md:translate-y-0"
      >
        <div
          class="text-[rgba(255,255,255,0.70)] text-lg leading-[120%] font-medium"
        >
          Total Supply
        </div>
        <div class="flex items-center gap-2">
          <div class="text-[#EDFFA4] font-medium text-[32px] leading-[110%]">
            80BN
          </div>
          <div class="font-medium text-2xl leading-[110%]">Tokens</div>
        </div>
      </div>

      <div
        v-for="(card, index) in TokenomicsCards"
        :key="index"
        :class="[
          'flex flex-col gap-2 absolute items-start max-md:hidden',
          {
            'top-[30px] left-[-125px] max-xl:left-[-160px] max-xl:top-[-30px]':
              index === 0,
          },
          {
            'top-10 right-[-130px] max-xl:top-[-20px] max-xl:right-[-190px]':
              index === 1,
          },
          {
            'top-36 left-[-210px] max-xl:top-14 max-xl:left-[-185px]':
              index === 2,
          },
          {
            'bottom-[270px] right-[-310px] max-xl:bottom-[40px] max-xl:right-[-215px]':
              index === 3,
          },
          {
            'bottom-14 left-[-140px] max-xl:left-[-200px] max-xl:bottom-[-20px]':
              index === 4,
          },
          {
            'bottom-7 right-[-100px] max-xl:bottom-[-75px] max-xl:right-[-160px]':
              index === 5,
          },
        ]"
        @mouseenter="hoverIndex = index"
        @mouseleave="hoverIndex = null"
      >
        <div class="flex gap-2 font-medium leading-[110%] items-center">
          <div
            class="text-3xl max-xl:text-2xl max-md:text-[22px]"
            :style="{ color: hoverIndex === index ? card.color : 'white' }"
          >
            {{ card.percents }}
          </div>
          <div
            class="text-xl max-xl:text-base !leading-[110%] max-md:text-sm max-xl:max-w-[130px]"
            :style="{ color: hoverIndex === index ? card.color : 'white' }"
          >
            {{ card.name }}
          </div>
        </div>

        <div
          class="border rounded-full border-white px-3 py-2 font-medium leading-[110%] text-lg max-xl:text-base max-md:text-sm"
        >
          {{ card.price }}
        </div>

        <div
          :class="[
            'absolute h-auto',
            {
              'translate-x-[115%] top-4 w-[180px] max-xl:w-[120px] max-xl:translate-x-[125%]':
                index === 0,
            },
            {
              'translate-x-[-105%] top-4 w-[180px] max-xl:w-[120px]':
                index === 1,
            },
            {
              ' right-[-55%] top-4 w-[135px] max-xl:w-[90px] max-xl:right-[-20%]':
                index === 2,
            },
            {
              'translate-x-[-110%] top-4 w-[130px] max-xl:w-[100px]':
                index === 3,
            },
            {
              'translate-x-[115%] top-[-20px] w-[155px] max-xl:w-[120px] max-xl:top-[-15px] max-xl:translate-x-[112%]':
                index === 4,
            },
            {
              'translate-x-[-105%] top-[-20px] w-[170px] max-xl:w-[140px]':
                index === 5,
            },
          ]"
        >
          <img :src="card.image" class="object-contain" />
        </div>
      </div>
    </div>

    <div
      class="hidden max-md:flex flex-col gap-1 w-full px-4 relative min-w-[450px]"
    >
      <div
        v-for="(card, index) in TokenomicsCards"
        :key="index"
        class="flex items-center relative z-10"
        :class="index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'"
      >
        <div
          class="flex flex-col gap-2 flex-1 items-start"
          :class="index % 2 === 0 ? 'items-end' : ''"
        >
          <div class="flex flex-col gap-2 flex-1 items-start">
            <div
              class="flex gap-2 font-medium leading-[110%] items-center flex-row"
              :class="index % 2 === 0 ? '' : 'ml-5'"
            >
              <div class="text-[22px]">
                {{ card.percents }}
              </div>
              <div class="text-sm !leading-[110%] max-w-[110px]">
                {{ card.name }}
              </div>
            </div>

            <div class="flex items-center">
              <div v-if="index % 2 !== 0" class="w-10 h-auto">
                <img :src="TokenomicsLineRight" class="object-contain" />
              </div>

              <div
                class="border rounded-full border-white px-3 py-2 font-medium leading-[110%] text-sm"
              >
                {{ card.price }}
              </div>

              <div v-if="index % 2 === 0" class="w-10 h-auto">
                <img :src="TokenomicsLineLeft" class="object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center flex-shrink-0">
          <div
            v-if="index < TokenomicsCards.length"
            class="w-2"
            :class="{
              'rounded-t-full': index === 0,
              'rounded-b-full': index === TokenomicsCards.length - 1,
            }"
            :style="{
              height: `${parseInt(card.percents) * 7}px`,
              backgroundColor: card.color,
            }"
          ></div>
        </div>

        <div
          class="flex-1 flex"
          :class="index % 2 === 0 ? 'justify-start' : 'justify-end'"
        ></div>
      </div>
    </div>
  </div>
</template>
