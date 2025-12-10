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
export { default as XrpIcon } from "./XrpIcon.vue";
export { default as DogeIcon } from "./DogeIcon.vue";
export { default as TonIcon } from "./TonIcon.vue";
export { default as TrxIcon } from "./TrxIcon.vue";
export { default as AdaIcon } from "./AdaIcon.vue";
export { default as UsdcIcon } from "./UsdcIcon.vue";
export { default as PepeIcon } from "./PepeIcon.vue";
export { default as ShibIcon } from "./ShibIcon.vue";
export { default as BusdIcon } from "./BusdIcon.vue";
export { default as FlokiIcon } from "./FlokiIcon.vue";
export { default as MaticIcon } from "./MaticIcon.vue";

// Token icon mapping for dynamic usage
export const TOKEN_ICONS = {
  eth: () => import("./EthIcon.vue"),
  bnb: () => import("./BnbIcon.vue"),
  usdt: () => import("./UsdtIcon.vue"),
  btc: () => import("./BtcIcon.vue"),
  sol: () => import("./SolIcon.vue"),
  dogeball: () => import("./DogeballIcon.vue"),
  xrp: () => import("./XrpIcon.vue"),
  doge: () => import("./DogeIcon.vue"),
  ton: () => import("./TonIcon.vue"),
  trx: () => import("./TrxIcon.vue"),
  ada: () => import("./AdaIcon.vue"),
  usdc: () => import("./UsdcIcon.vue"),
  pepe: () => import("./PepeIcon.vue"),
  shib: () => import("./ShibIcon.vue"),
  busd: () => import("./BusdIcon.vue"),
  floki: () => import("./FlokiIcon.vue"),
  matic: () => import("./MaticIcon.vue"),
};
