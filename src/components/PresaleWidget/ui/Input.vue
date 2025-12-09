<template>
  <div
    :class="[
      'flex gap-2 bg-[rgba(255,255,255,0.15)] rounded-md h-12 px-2 pt-1 pb-[0.125rem]',
      $attrs.class,
    ]"
  >
    <div class="flex flex-col flex-1">
      <p v-if="label" class="text-xs text-[var(--text-secondary)] leading-[1]">
        {{ label }}
      </p>
      <input
        :class="['flex-1 outline-none bg-transparent', inputClass]"
        :value="modelValue"
        v-bind="$attrs"
        @input="handleInput"
        @focus="handleFocus"
        @blur="handleBlur"
        size="1"
      />
    </div>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    default: "",
  },
  modelValue: {
    type: [String, Number],
    default: "",
  },
  inputClass: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue", "focus", "blur", "input"]);

const handleInput = (e) => {
  emit("update:modelValue", e.target.value);
  emit("input", e);
};

const handleFocus = (e) => {
  emit("focus", e);
};

const handleBlur = (e) => {
  emit("blur", e);
};
</script>

