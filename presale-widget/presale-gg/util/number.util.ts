export const zeroPad = (num: number | string, zeros: number): string => {
  let numStr = typeof num === "string" ? num : num.toString();
  const len = numStr.length;
  for (let i = 0; i < zeros - len; i++) {
    numStr = `0${numStr}`;
  }
  return numStr;
};

export const minMax = (num: number, min: number, max: number): number => {
  if (num < min) return min;
  if (num > max) return max;
  return num;
};

const minDecimalPlaces = 0;
const maxDecimalPrecision = 8;

export const removeTrailingZeros = (
  numStr: string | number,
  minDecimals: number = minDecimalPlaces
): string => {
  numStr = numStr.toString();
  const numSplit = numStr.split(".");
  if (numSplit.length < 2) return numStr;
  const integerStr = numSplit[0];
  const decimalStr = numSplit[1];
  if (decimalStr.length <= minDecimals) return "";
  const trailingZerosMatch = decimalStr.match(/0*$/);
  if (!trailingZerosMatch) return "";
  let trailingZerosStr = trailingZerosMatch[0];
  const precisionDecimalStr = decimalStr.substring(0, trailingZerosMatch.index);
  trailingZerosStr = trailingZerosStr.substring(
    0,
    minDecimals - (decimalStr.length - trailingZerosStr.length)
  );
  return `${integerStr}.${precisionDecimalStr}${trailingZerosStr}`;
};

export const formatPrecision = (
  num: number,
  minDecimals: number = minDecimalPlaces,
  maxPrecision: number = maxDecimalPrecision
) => {
  if (num === 0) return "0";
  num =
    Math.floor(num * Math.pow(10, maxDecimalPrecision) + 0.5) /
    Math.pow(10, maxDecimalPrecision);

  let numStr = removeTrailingZeros(
    new Intl.NumberFormat("en-GB", {
      useGrouping: false,
      minimumSignificantDigits: 3,
      minimumFractionDigits: 3,
      compactDisplay: "long",
    }).format(num)
  );
  let decimals: number = 0;
  if (numStr.includes(".")) {
    decimals = numStr.split(".")[1].length;
  }
  if (decimals < minDecimals) {
    if (decimals === 0) numStr = numStr + ".";
    for (let i = decimals; i < minDecimals; i++) {
      numStr = numStr + "0";
    }
  }
  if (decimals > 0) {
    const numSplit = numStr.split(".");
    const integerStr = numSplit[0];
    const decimalStr = numSplit[1];
    let nonZeroDecimals = (decimalStr.match(/[1-9][0-9]*/) || [""])[0];
    const nonZeroDecimalCount = nonZeroDecimals.length;
    const zeroDecimals = (decimalStr.match(/0*/) || [""])[0];
    let decimals = zeroDecimals + nonZeroDecimals;
    if (integerStr !== "0" && decimals.length > maxPrecision) {
      decimals = decimals.substring(0, maxPrecision);
      const trailingZeros = removeTrailingZeros(decimals, minDecimals);
      numStr = `${integerStr}.${trailingZeros}`;
    } else if (nonZeroDecimalCount > maxPrecision) {
      nonZeroDecimals = nonZeroDecimals.substring(0, maxPrecision);
      numStr = `${integerStr}.${zeroDecimals}${removeTrailingZeros(
        nonZeroDecimals,
        minDecimals
      )}`;
    }
  }

  return numStr.replace(/\.$/, "");
};

export const addCommas = (num: number | string): string => {
  const str = num.toString();
  const split = str.split(".");
  const decimals = split[1];
  const int = split[0];
  return (
    int
      .split("")
      .reverse()
      .map((char, i) => (i % 3 === 2 ? `,${char}` : char))
      .reverse()
      .join("")
      .replace(/(,$)|(^,)/, "") + (decimals ? "." + decimals : "")
  );
};

export const formatDollar = (
  num: number | string,
  addSymbol = true,
  minDp = 2,
  maxDp = 2
): string => {
  if (typeof num === "string") num = Number.parseFloat(num);
  const original = num;
  num = Math.abs(num);
  let str = addCommas(formatPrecision(num, minDp, maxDp));
  if (addSymbol) str = `${original < 0 ? "-" : ""}$${str}`;
  return str;
};

export const getMinMaxArr = (arr: number[]): [number, number] => {
  if (arr.length === 0) return [0, 0];

  let min = arr[0];
  let max = arr[0];
  arr.forEach((num) => {
    if (num < min) min = num;
    if (num > max) max = num;
  });
  return [min, max];
};

export const getMinMaxArrIndex = (arr: number[]): [number, number] => {
  if (arr.length === 0) return [0, 0];

  let min = arr[0];
  let minIndex = 0;
  let max = arr[0];
  let maxIndex = 0;

  arr.forEach((num, i) => {
    if (num < min) {
      min = num;
      minIndex = i;
    }
    if (num >= max) {
      max = num;
      maxIndex = i;
    }
  });
  return [minIndex, maxIndex];
};

export const toHex = (num: number | bigint, pad?: boolean) => {
  let hex = num.toString(16);
  if (pad && hex.length % 2 === 1) hex = `0${hex}`;
  return `0x${hex}`;
};

export const fromHex = (hex: string) => {
  if (hex.startsWith("0x")) hex = hex.slice(2);
  return Number.parseInt(hex, 16);
};

export const formatNumber = (
  num: number,
  minDP?: number,
  maxDP?: number
): string => {
  return addCommas(formatPrecision(num, minDP, maxDP));
};

const letterMap = {
  K: 1_000,
  M: 1_000_000,
  B: 1_000_000_000,
  T: 1_000_000_000_000,
  Q: 1_000_000_000_000_000,
};

export const formatLargeNumber = (
  num: number,
  precisionCutoff: number = 1000,
  minDP = 2,
  maxDP = 2
) => {
  if (num < precisionCutoff) return formatNumber(num, minDP, maxDP);
  num = Math.floor(num);
  let newNum = num;
  let suffix = "";
  Object.entries(letterMap).forEach(([letter, divisor]) => {
    if (num / divisor < 1000 && num / divisor >= 1) {
      suffix = letter;
      newNum = num / divisor;
    }
  });
  return `${roundToDP(newNum, maxDP < 2 ? maxDP : 2)}${suffix}`;
};

export const roundToDP = (num: number, decimalPlaces: number) => {
  return Math.floor(num * 10 ** decimalPlaces) / 10 ** decimalPlaces;
};

export const parseNum = (num: number | string | undefined | null): number => {
  if (typeof num === "number") return num;
  return Number.parseFloat(num || "0");
};

export const limitDecimals = (num: number, decimals: number): string => {
  let str = num.toPrecision(decimals);
  const [intStr, decimalStr] = str.split(".");
  if (!decimalStr) return str;
  if (decimalStr.length + intStr.length <= decimals) return str;
  str = str.substring(0, decimals);
  if (str.endsWith(".")) str = str.slice(0, -1);
  return str;
};

export const partialNumRegexp = /^(\d*|(\d+(\.\d*)?)?)$/;
