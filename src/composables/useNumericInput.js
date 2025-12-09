import { ref } from "vue";
import { partialNumRegexp, parseNum, formatPrecision } from "@/utils/format";

/**
 * Composable for handling numeric input fields
 * @param {Object} options - Configuration options
 * @param {string} options.initialValue - Initial value (default: "0")
 * @param {number} options.minDecimals - Minimum decimal places (default: 0)
 * @param {number} options.maxDecimals - Maximum decimal places (default: 2)
 * @returns {Object} - Input handlers and value ref
 */
export function useNumericInput(options = {}) {
  const { initialValue = "0", minDecimals = 0, maxDecimals = 2 } = options;

  const value = ref(initialValue);

  const handleFocus = (e) => {
    if (e.target.value === "0") {
      e.target.value = "";
      value.value = "";
    }
  };

  const handleBlur = (e) => {
    if (e.target.value === "") {
      e.target.value = "0";
      value.value = "0";
    }
  };

  const handleInput = (e, onChange) => {
    let val = e.target.value;
    if (!partialNumRegexp.test(val)) {
      val = value.value;
    }
    e.target.value = val;
    value.value = val;
    onChange?.(val);
  };

  const setValue = (val) => {
    value.value = String(val);
  };

  const getNumericValue = () => parseNum(value.value);

  const format = (num) => formatPrecision(num, minDecimals, maxDecimals);

  return {
    value,
    setValue,
    getNumericValue,
    format,
    handleFocus,
    handleBlur,
    handleInput,
  };
}

