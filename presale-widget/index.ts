// Export the main PresaleWidget component
export { PresaleWidget } from "./presale-widget";

// Export Widget component
export { default as Widget } from "./components/Widget";

// Export individual tabs if needed
export { default as BuyTab } from "./components/Widget/tabs/BuyTab";
export { default as StakeTab } from "./components/Widget/tabs/StakeTab";
export { default as HistoryTab } from "./components/Widget/tabs/HistoryTab";

// Export UI components
export { Button } from "./ui/button";
export { Input } from "./ui/input";

// Export constants
export { LAUNCH_PRICE } from "./constants/numbers";

// Export utilities
export { cn } from "./lib/utils";

// Export config functions
export { setWagmiAdapter, setLoadStoredConnection } from "./config";




