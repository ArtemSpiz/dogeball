// Icon components for PresaleWidget

// UI Icons
export { default as CopyIcon } from "./CopyIcon.vue";
export { default as CheckIcon } from "./CheckIcon.vue";
export { default as ChevronDownIcon } from "./ChevronDownIcon.vue";
export { default as PresaleGgIcon } from "./PresaleGgIcon.vue";
export { default as CardIcons } from "./CardIcons.vue";

// Tab Icons
export { default as BuyIcon } from "./BuyIcon.vue";
export { default as StakeIcon } from "./StakeIcon.vue";
export { default as DashboardIcon } from "./DashboardIcon.vue";

// Token Icons
export { default as DogeballIcon } from "./DogeballIcon.vue";
export { default as EthIcon } from "./EthIcon.vue";
export { default as BnbIcon } from "./BnbIcon.vue";
export { default as UsdtIcon } from "./UsdtIcon.vue";
export { default as BtcIcon } from "./BtcIcon.vue";
export { default as SolIcon } from "./SolIcon.vue";

// Token icon mapping for dynamic usage
export const TOKEN_ICONS = {
  eth: () => import("./EthIcon.vue"),
  bnb: () => import("./BnbIcon.vue"),
  usdt: () => import("./UsdtIcon.vue"),
  btc: () => import("./BtcIcon.vue"),
  sol: () => import("./SolIcon.vue"),
  dogeball: () => import("./DogeballIcon.vue"),
};
