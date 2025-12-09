/**
 * Toast Notification Composable
 *
 * Simple reactive toast notification system.
 *
 * Usage:
 *   const { showSuccess, showError, showInfo, toasts } = useToast()
 *   showSuccess('Transaction completed!')
 *   showError('Something went wrong')
 */

import { ref, readonly } from "vue";

// Toast types
export const ToastType = {
  SUCCESS: "success",
  ERROR: "error",
  INFO: "info",
  WARNING: "warning",
};

// Global toast state
const toasts = ref([]);
let toastId = 0;

/**
 * Add a toast notification
 */
const addToast = (message, type = ToastType.INFO, duration = 4000) => {
  const id = ++toastId;
  const toast = {
    id,
    message,
    type,
    timestamp: Date.now(),
  };

  toasts.value.push(toast);

  // Auto-remove after duration
  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }

  return id;
};

/**
 * Remove a toast by ID
 */
const removeToast = (id) => {
  const index = toasts.value.findIndex((t) => t.id === id);
  if (index > -1) {
    toasts.value.splice(index, 1);
  }
};

/**
 * Clear all toasts
 */
const clearToasts = () => {
  toasts.value = [];
};

/**
 * Toast composable
 */
export function useToast() {
  const showSuccess = (message, duration = 4000) => {
    return addToast(message, ToastType.SUCCESS, duration);
  };

  const showError = (message, duration = 5000) => {
    return addToast(message, ToastType.ERROR, duration);
  };

  const showInfo = (message, duration = 4000) => {
    return addToast(message, ToastType.INFO, duration);
  };

  const showWarning = (message, duration = 4000) => {
    return addToast(message, ToastType.WARNING, duration);
  };

  /**
   * Promise-based toast that shows loading, then success/error
   */
  const promise = async (promiseFn, options = {}) => {
    const {
      loading = "Loading...",
      success = "Success!",
      error = "Something went wrong",
    } = options;

    const loadingId = addToast(loading, ToastType.INFO, 0);

    try {
      const result = await promiseFn();
      removeToast(loadingId);
      showSuccess(typeof success === "function" ? success(result) : success);
      return result;
    } catch (err) {
      removeToast(loadingId);
      showError(typeof error === "function" ? error(err) : error);
      throw err;
    }
  };

  return {
    toasts: readonly(toasts),
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeToast,
    clearToasts,
    promise,
  };
}

