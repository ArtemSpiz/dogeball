<script setup>
  import { useToast } from '@/composables';
import { copyText } from '@/utils/format';
  const props = defineProps({
    label: {type: String, required: true},
    value: {type: String, required: true}
  });
  const toast = useToast()

  const copy = () => {
    copyText(props.value.toString())
    toast.showInfo("Copied text")
  }
</script>

<template>
  <div class="flex gap-2 bg-[rgba(255,255,255,0.15)] rounded-md h-12 px-2 pt-1 pb-[0.125rem]">
    <div class="flex flex-col flex-1">
      <p class="text-xs leading-[1]">
        {{props.label}}
      </p>
      <input
        size="1"
        className="flex-1 outline-none bg-transparent"
        placeholder="0"
        :value="props.value"
        readOnly
      />
    </div>
    <button
      class="bg-[#EB4102] text-[#fff] text-sm font-[500] px-2 leading-[1] rounded-md hover:brightness-125 w-[3.75rem] h-8 text-center flex items-center justify-center self-center -mt-[0.125rem]"
      @click="copy"
    >
      Copy
    </button>
  </div>
</template>