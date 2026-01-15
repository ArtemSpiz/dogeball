<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import Minus from "@/assets/icons/Minus.vue";
import Plus from "@/assets/icons/Plus.vue";
import { ref } from "vue";
import FAQdog from "@/assets/img/Home/FAQdogMob.png";
import FAQDogs from "@/assets/img/Home/FAQDogs.png";

const { t } = useI18n();

const getTextWithLink = (key, linkType = "presale") => {
  // vue-i18n treats `{link}` as an interpolation placeholder and will render it as an empty
  // string if no value is provided. Use a sentinel token and replace it with HTML.
  const LINK_TOKEN = "__FAQ_LINK__";
  const text = t(key, { link: LINK_TOKEN });
  let linkHtml = "";
  if (linkType === "presale") {
    linkHtml = `<a data-scroll="presale" class="underline text-inherit cursor-pointer hover:opacity-90">${t(
      "common.clickHere"
    )}</a>`;
  } else if (linkType === "howToBuy") {
    linkHtml = `<a data-scroll="howToBuy" class="underline text-inherit cursor-pointer hover:opacity-90">${t(
      "common.clickHere"
    )}</a>`;
  } else if (linkType === "whitepaper") {
    linkHtml = `<a href="/DOGEBALLCoinsultAudit.pdf" target="_blank" class="underline text-inherit cursor-pointer hover:opacity-90">${t(
      "common.clickHere"
    )}</a>`;
  } else if (linkType === "presaleParens") {
    linkHtml = `<a data-scroll="presale" class="underline text-inherit cursor-pointer hover:opacity-90">(${t(
      "common.clickHere"
    )})</a>`;
  }
  return text.replace(LINK_TOKEN, linkHtml);
};

const FAQcards = computed(() => [
  {
    title: t("faq.q1"),
    text: t("faq.a1"),
  },
  {
    title: t("faq.q2"),
    text: getTextWithLink("faq.a2", "howToBuy"),
  },
  {
    title: t("faq.q3"),
    text: getTextWithLink("faq.a3", "presaleParens"),
  },
  {
    title: t("faq.q4"),
    text: getTextWithLink("faq.a4", "presale"),
  },
  {
    title: t("faq.q5"),
    text: t("faq.a5"),
  },
  {
    title: t("faq.q6"),
    text: getTextWithLink("faq.a6", "whitepaper"),
  },
  {
    title: t("faq.q7"),
    text: t("faq.a7"),
  },
  {
    title: t("faq.q8"),
    text: t("faq.a8"),
  },
  {
    title: t("faq.q9"),
    text: t("faq.a9"),
  },
  {
    title: t("faq.q10"),
    text: t("faq.a10"),
  },
  {
    title: t("faq.q11"),
    text: t("faq.a11"),
  },
  {
    title: t("faq.q12"),
    text: t("faq.a12"),
  },
]);

const FAQcardsMob = computed(() => [
  {
    title: t("faq.q1"),
    text: t("faq.a1"),
  },
  {
    title: t("faq.q3"),
    text: getTextWithLink("faq.a3", "presale"),
  },
  {
    title: t("faq.q2"),
    text: getTextWithLink("faq.a2", "howToBuy"),
  },
  {
    title: t("faq.q7"),
    text: t("faq.a7"),
  },
  {
    title: t("faq.q4"),
    text: getTextWithLink("faq.a4", "presale"),
  },
  {
    title: t("faq.q5"),
    text: t("faq.a5"),
  },
  {
    title: t("faq.q6"),
    text: getTextWithLink("faq.a6", "whitepaper"),
  },
  {
    title: t("faq.q8"),
    text: t("faq.a8"),
  },
  {
    title: t("faq.q9"),
    text: t("faq.a9"),
  },
  {
    title: t("faq.q10"),
    text: t("faq.a10"),
  },
  {
    title: t("faq.q11"),
    text: t("faq.a11"),
  },
  {
    title: t("faq.q12"),
    text: t("faq.a12"),
  },
]);

const openIndex = ref(null);

function toggleOpen(index) {
  openIndex.value = openIndex.value === index ? null : index;
}

const isMobile = window.innerWidth < 768;

function handleHtmlClick(e) {
  const target = e.target.closest("[data-scroll]");
  if (!target) return;

  e.preventDefault();

  const id = target.getAttribute("data-scroll");
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
}
</script>

<template>
  <div
    id="faq"
    class="flex px-5 h-[1200px] max-2xl:!bg-cover bgFill max-lg:h-[1250px] max-md:h-max flex-col relative py-20 max-md:py-12 max-md:pb-0 gap-12 bg-[center_bottom] bg-cover bg-no-repeat bg-[url('@/assets/img/Home/FAQBg.png')] overflow-hidden max-md:bg-[url('@/assets/img/Home/FAQBgMob.png')]"
  >
    <div class="title z-20 uppercase max-w-[700px] text-center mx-auto">
      {{ t("faq.title") }}
    </div>

    <div
      class="w-full max-w-[1600px] max-md:hidden px-5 h-auto absolute bottom-[30px] right-1/2 translate-x-1/2"
    >
      <img :src="FAQDogs" class="object-contain" />
    </div>

    <div class="flex z-30 flex-col gap-4 max-w-7xl mx-auto max-md:h-[1000px]">
      <div class="grid grid-cols-2 max-md:grid-cols-1 gap-4">
        <div class="flex flex-col gap-4">
          <div
            v-for="(card, i) in isMobile
              ? FAQcardsMob
              : FAQcards.filter((_, idx) => idx % 2 === 0)"
            :key="isMobile ? i : i * 2"
            class="p-8 max-md:p-4 gap-4 w-full max-w-[450px] backdrop-blur-sm relative bg-[rgba(53,19,147,0.52)] rounded-2xl flex flex-col transition-all"
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

            <div
              class="flex gap-4 items-start cursor-pointer z-50"
              @click="toggleOpen(isMobile ? i : i * 2)"
            >
              <div
                class="rounded-full h-8 w-8 min-w-[32px] flex items-center bg-[#FFEEE1] justify-center"
              >
                <component
                  :is="openIndex === (isMobile ? i : i * 2) ? Minus : Plus"
                />
              </div>

              <div
                class="text-xl max-md:text-base my-auto font-bold leading-[110%]"
              >
                {{ card.title }}
              </div>
            </div>

            <Transition name="expand">
              <p
                v-if="openIndex === (isMobile ? i : i * 2)"
                v-html="card.text"
                @click="handleHtmlClick"
                class="text-base max-md:text-sm leading-[120%] font-grotesk font-normal z-50 pl-12 max-md:pl-0"
              />
            </Transition>
          </div>
        </div>

        <div class="flex flex-col gap-4 max-md:hidden">
          <div
            v-for="(card, i) in FAQcards.filter((_, idx) => idx % 2 === 1)"
            :key="i * 2 + 1"
            class="p-8 gap-4 w-full max-w-[450px] backdrop-blur-sm relative bg-[rgba(53,19,147,0.52)] rounded-2xl flex flex-col transition-all"
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

            <div
              class="flex gap-4 items-start cursor-pointer z-50"
              @click="toggleOpen(i * 2 + 1)"
            >
              <div
                class="rounded-full h-8 w-8 min-w-[32px] flex items-center bg-[#FFEEE1] justify-center"
              >
                <component :is="openIndex === i * 2 + 1 ? Minus : Plus" />
              </div>

              <div class="text-xl my-auto font-bold leading-[110%]">
                {{ card.title }}
              </div>
            </div>

            <Transition name="expand">
              <p
                v-if="openIndex === i * 2 + 1"
                v-html="card.text"
                @click="handleHtmlClick"
                class="text-base leading-[120%] z-50 pl-12"
              />
            </Transition>
          </div>
        </div>
      </div>
    </div>
    <div class="h-auto w-full mx-auto max-w-[400px] md:hidden">
      <img :src="FAQdog" class="object-contain" />
    </div>
  </div>
</template>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: all 0.3s ease;
  max-height: 500px;
  opacity: 1;
}

.expand-enter-from,
.expand-leave-to {
  max-height: 0;
  opacity: 0;
  overflow: hidden;
}
</style>
