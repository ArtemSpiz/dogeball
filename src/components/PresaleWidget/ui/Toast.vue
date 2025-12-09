<template>
  <Teleport to="body">
    <TransitionGroup
      tag="div"
      name="toast"
      class="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        :class="[
          'pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg backdrop-blur-md min-w-[280px] max-w-[400px] border transition-all duration-300',
          toastClasses[toast.type],
        ]"
      >
        <!-- Icon -->
        <div class="flex-shrink-0">
          <svg
            v-if="toast.type === 'success'"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <svg
            v-else-if="toast.type === 'error'"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <svg
            v-else-if="toast.type === 'warning'"
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <svg
            v-else
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <!-- Message -->
        <p class="flex-1 text-sm font-medium leading-tight">
          {{ toast.message }}
        </p>

        <!-- Close button -->
        <button
          @click="removeToast(toast.id)"
          class="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<script setup>
import { useToast } from "@/composables/useToast";

const { toasts, removeToast } = useToast();

const toastClasses = {
  success: "bg-emerald-500/90 text-white border-emerald-400/50",
  error: "bg-red-500/90 text-white border-red-400/50",
  warning: "bg-amber-500/90 text-white border-amber-400/50",
  info: "bg-blue-500/90 text-white border-blue-400/50",
};
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>

