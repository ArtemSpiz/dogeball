<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';

const { endDate } = defineProps({
  endDate: Date,
})
const emit = defineEmits(["onEnd"])

const msDiff = ref(Math.max(endDate.getTime() - Date.now(), 0))

let interval = null

onMounted(() => {
  const func = () => {
    msDiff.value = Math.max(endDate.getTime() - Date.now(), 0)
  }
  interval = setInterval(func, 1000)
})

onUnmounted(() => {
  clearInterval(interval)
})

/** @type {import("vue").ComputedGetter<[string, string][]>} */
const countdownData = computed(() => {
  const data = [
    ["DAYS", 1000 * 60 * 60 * 24],
    ["HOURS", 1000 * 60 * 60],
    ["MINUTES", 1000 * 60],
    ["SECONDS", 1000],
  ];

  const returnData = [];

  data.forEach(([label, num], i) => {
    let currDiff = msDiff.value;
    if (i > 0)
      returnData.slice(0, i).forEach(([_, currNum], i2) => {
        currDiff -= currNum * data[i2][1];
      });

    returnData.push([label, Math.floor(currDiff / num)]);
  });

  const finalData = returnData.map(([key, val]) => [key, val.toString().padStart(2, "0")]);
  return finalData
})


let calledBackRef = ref(msDiff <= 0);
watch(msDiff, (msDiff) => {
  if (msDiff <= 0 && !calledBackRef.current) {
    calledBackRef.current = true;
    emit("onEnd")
  } else if (calledBackRef.current && msDiff > 0) {
    calledBackRef.current = false;
  }
});
</script>

<template>
  <div class="flex justify-between items-center my-1">
    <template v-for="(data, i) in countdownData" :key="i">
      <div class="w-px bg-[#D3D3D3] h-4" v-if="i > 0" />
      <div class="flex flex-col gap-1.5 leading-[1] items-center gap-0.5 justify-center w-[5.5rem]">
        <p class="text-[1.5rem] font-bold leading-[0.8] !text-[inherit]">
          {{data[1]}}
        </p>
        <p class="text-[0.75rem]">
          {{data[0]}}
        </p>
      </div>
    </template>
  </div>
</template>