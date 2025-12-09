<template>
  <component
    :is="component || 'div'"
    v-if="loading"
    :class="[
      'loadable',
      loadVariant,
      {
        'loadable-full': full,
        'loadable-invisible': invisible,
      },
      loadClass,
      $attrs.class,
    ]"
    :style="{
      ...loadStyles,
      '--length': `${length || 4}em`,
    }"
  />
  <component v-else-if="error && errorElement" :is="errorElement" />
  <component v-else-if="component" :is="component" v-bind="$attrs">
    <slot />
  </component>
  <slot v-else />
</template>

<script setup>
import { inject } from "vue";

defineProps({
  component: {
    type: [String, Object],
    default: "div",
  },
  loadVariant: {
    type: String,
    default: "text",
    validator: (val) => ["text", "block", "none"].includes(val),
  },
  loadStyles: {
    type: Object,
    default: () => ({}),
  },
  loadClass: {
    type: String,
    default: "",
  },
  full: {
    type: Boolean,
    default: false,
  },
  length: {
    type: Number,
    default: 4,
  },
  invisible: {
    type: Boolean,
    default: false,
  },
  error: {
    type: Boolean,
    default: false,
  },
  errorElement: {
    type: [String, Object],
    default: null,
  },
});

const loading = inject("loading", false);
</script>

<style scoped>
.loadable {
  display: block;
  animation: load-pulse 1000ms infinite alternate ease-in-out;
}

.loadable.text {
  display: inline-block;
  border-radius: 0.25rem;
  --lh-offset: 0.1em;
  height: calc(1em - var(--lh-offset));
  margin-block: calc((1lh - 1em + var(--lh-offset)) / 2);
  width: var(--length, 12em);
}

.loadable.invisible {
  animation: none;
}

.loadable-full {
  width: 100%;
  height: 100%;
}

.loadable.block {
  display: block;
  border-radius: 0.25rem;
}

@keyframes load-pulse {
  from {
    background-color: rgba(0, 0, 0, 0.3);
  }
  to {
    background-color: rgba(0, 0, 0, 0.4);
  }
}
</style>

