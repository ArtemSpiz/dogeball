<script setup>
import HowToBuyDog from "@/assets/img/Home/HowToBuyDog.png";
import HowToBuyCoin from "@/assets/img/Home/HowToBuyCoin.png";
import HowToBuyMoney from "@/assets/img/Home/HowToBuyMoney.png";

const HowBuyCards = [
  {
    type: "orange",
    underTitle: "Step 1",
    title: "Connect Wallet",
    text: `Locate the presale widget at the top of the webpage (<a href='#presale' class="underline">Click Here</a>) and click 'Connect Wallet' using your preferred wallet. Multiple wallet options (inc. Metamask and Coinbase) are available for selection.`,
  },
  {
    type: "white",
    underTitle: "Step 2",
    title: "Select Token and Amount",
    text: "Select your preferred currency (ETH, USDT, USDC, SOL, BNB plus many more) or pay by bank card, select the amount of $DOGEBALL tokens you want to purchase and click 'BUY $DOGEBALL'. Enter Referral and Bonus codes (if you have these) – see FAQs for more details over using codes.",
  },
  {
    type: "purple",
    underTitle: "Step 3",
    title: "Buy Token and Approve Transaction",
    text: "Complete your purchase by approving the transaction in your connected wallet. Once confirmed, your purchase and token amount will be securely recorded on-chain and visible under 'Dashboard' in the presale widget above.",
  },
  {
    type: "white",
    underTitle: "Step 4",
    title: "Claim $DOGEBALL Token",
    text: "After the presale ends, you can claim your $DOGEBALL tokens with the same wallet used for your purchase. Details on claiming will be released on social media channels once the presale concludes.",
  },
  {
    type: "orange",
    underTitle: "Earn Rewards",
    title: "STAKING",
    text: "Lock your presale purchase tokens in our secure and audited smart-contract staking pool; earn $DOGEBALL rewards with a high 80% APY and maximize your $DOGEBALL token return.",
  },
];
</script>

<template>
  <div
    id="howToBuy"
    class="bg-[center_bottom] max-xl:!bg-cover bgFill bg-cover bg-no-repeat bg-[url('@/assets/img/Home/HowToBuyBg.png')] max-lg:bg-[url('@/assets/img/Home/HowToBuyBgMob.png')]"
  >
    <div
      class="flex max-w-[2000px] mx-auto relative overflow-hidden gap-14 max-md:gap-8 max-xl:flex-col max-lg:h-[900px] max-md:h-[800px] py-[150px] max-md:py-12"
    >
      <div
        class="title min-w-[340px] pl-20 max-lg:px-20 max-md:px-5 max-md:mx-auto max-md:text-center max-md:min-w-0 max-md:max-w-[165px]"
      >
        HOW TO BUY
      </div>

      <div
        class="grid grid-cols-[repeat(3,1fr)] pr-20 max-xl:px-20 grid-rows-[repeat(2,1fr)] gap-6 max-lg:hidden"
      >
        <div
          v-for="(card, i) in HowBuyCards"
          :key="i"
          class="p-6 flex rounded-2xl flex-col gap-4 backdrop-blur-sm relative"
          :class="[
            { 'bg-[#E53501] text-white': card.type === 'orange' },
            { 'bg-[#CEC2B1] text-[#020323]': card.type === 'white' },
            { 'bg-[#30197A] text-white': card.type === 'purple' },

            i === 0 && 'row-start-1 col-start-1',
            i === 1 && 'row-start-1 col-start-2',
            i === 2 && 'row-start-1 col-start-3 row-span-2',
            i === 3 && 'row-start-2 col-start-1',
            i === 4 && 'row-start-2 col-start-2',
          ]"
        >
          <div class="flex flex-col gap-2">
            <div class="text-base font-medium leading-[125%]">
              {{ card.underTitle }}
            </div>
            <div class="text-2xl font-medium leading-[110%]">
              {{ card.title }}
            </div>
          </div>

          <p v-html="card.text" class="description"></p>

          <div
            v-if="card.type === 'purple'"
            class="absolute left-0 bottom-0 w-[250px] h-auto"
          >
            <img :src="HowToBuyCoin" class="object-contain" />
          </div>
        </div>
      </div>

      <div
        class="max-lg:flex hidden gap-6 max-md:gap-2 px-20 scrollbar-hide overflow-x-auto snap-x snap-mandatory max-md:px-5 pb-3"
      >
        <div
          v-for="(card, i) in HowBuyCards"
          :key="'mob_' + i"
          class="min-w-[50%] max-w-[80%] max-md:min-w-[350px] snap-center p-6 flex rounded-2xl flex-col gap-4 backdrop-blur-sm relative"
          :class="[
            { 'bg-[#E53501] text-white': card.type === 'orange' },
            { 'bg-[#CEC2B1] text-[#020323]': card.type === 'white' },
            { 'bg-[#30197A] text-white ': card.type === 'purple' },
          ]"
        >
          <div class="flex flex-col gap-2">
            <div class="text-base font-medium leading-[125%]">
              {{ card.underTitle }}
            </div>
            <div class="text-2xl font-medium leading-[110%]">
              {{ card.title }}
            </div>
          </div>

          <p v-html="card.text" class="description"></p>

          <div
            v-if="card.type === 'purple'"
            class="absolute left-0 bottom-0 w-[250px] max-lg:hidden h-auto"
          >
            <img :src="HowToBuyCoin" class="object-contain" />
          </div>
        </div>
      </div>

      <div
        class="absolute bottom-20 left-0 2xl:w-[320px] w-[400px] h-auto max-xl:static max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2 max-lg:bottom-2 max-md:bottom-[-90px]"
      >
        <img :src="HowToBuyDog" class="object-contain" />
      </div>

      <div
        class="absolute bottom-0 lg:hidden right-1/2 translate-x-1/2 w-full h-auto"
      >
        <img :src="HowToBuyMoney" class="object-contain" />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
