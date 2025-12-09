<template>
  <Loader :loading="isLoading">
    <div
      class="flex flex-col w-full rounded-3xl text-white overflow-hidden font-normal relative p-6 items-center gap-2.5 border border-white/20 bg-[rgba(23,138,184,0.40)] shadow-[0_0_14px_0_#5464D8] backdrop-blur-[5px] transition-[height] duration-200 ease-out"
    >
      <div
        ref="innerRef"
        class="flex flex-col gap-4 flex-shrink-0 w-full justify-start flex-1 h-0"
      >
        <!-- Tab Wrapper -->
        <div class="flex items-center justify-center w-full">
          <div
            class="inline-flex items-center gap-1 rounded-[80px] flex-wrap justify-center"
            style="background: rgba(255, 255, 255, 0.15)"
          >
            <button
              v-for="tab in tabs"
              :key="tab.key"
              :class="[
                'flex items-center justify-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-2 rounded-full font-medium relative overflow-hidden text-sm sm:text-base font-grotesk transition-all duration-300',
                selectedTabKey === tab.key
                  ? 'bg-white text-[#212F5C] shadow-md'
                  : 'text-white hover:bg-white/10',
              ]"
              @click="setSelectedTabKey(tab.key)"
            >
              <component
                :is="tab.icon"
                :color="selectedTabKey === tab.key ? '#212F5C' : '#FFF'"
                class="w-4 h-4 flex-shrink-0 transition-colors duration-300"
              />
              <span class="text-center font-medium text-sm leading-none">
                {{ tab.label }}
              </span>
            </button>
          </div>
        </div>

        <!-- Tab Content -->
        <Transition name="fade" mode="out-in">
          <component :is="selectedTab.component" :key="selectedTabKey" />
        </Transition>
      </div>
    </div>
  </Loader>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import BuyTab from "./tabs/BuyTab.vue";
import StakeTab from "./tabs/StakeTab.vue";
import HistoryTab from "./tabs/HistoryTab.vue";
import { Loader } from "./ui";
import { BuyIcon, StakeIcon, DashboardIcon } from "./icons";
import { usePresale } from "@/composables/usePresale";

const presale = usePresale();

const tabs = [
  {
    label: "Buy",
    key: "buy",
    icon: BuyIcon,
    component: BuyTab,
  },
  {
    label: "Stake",
    key: "stake",
    icon: StakeIcon,
    component: StakeTab,
  },
  {
    label: "Dashboard",
    key: "history",
    icon: DashboardIcon,
    component: HistoryTab,
  },
];

const selectedTabKey = ref("buy");
const selectedTab = computed(() =>
  tabs.find((tab) => tab.key === selectedTabKey.value)
);
const innerRef = ref(null);

const isLoading = computed(() => {
  return (
    presale.apiData.stageLoading.value ||
    presale.apiData.paymentTokensLoading.value
  );
});

const setSelectedTabKey = (key) => {
  selectedTabKey.value = key;
};

// Resize observer for smooth height transitions
let resizeObserver = null;

onMounted(() => {
  if (!innerRef.value) return;
  resizeObserver = new ResizeObserver(() => {
    // Height is handled via CSS flex
  });
  resizeObserver.observe(innerRef.value);
});

onUnmounted(() => {
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
