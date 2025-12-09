# PresaleWidget

A standalone presale widget package with all blockchain logic included. This package contains both UI components and API logic.

## Setup

### Installation

1. Copy the `presale-widget` folder to your project
2. Install required dependencies (see package.json dependencies)
3. Configure wagmiAdapter

### Usage

```tsx
import { PresaleWidget, setWagmiAdapter } from './presale-widget';
import { wagmiAdapter } from './your-wagmi-config';

// Configure wagmiAdapter before using the widget
setWagmiAdapter(wagmiAdapter);

export default function Page() {
  return <PresaleWidget />;
}
```

### Configuration

Before using the widget, you must configure the wagmiAdapter:

```tsx
import { setWagmiAdapter } from './presale-widget/config';
import { wagmiAdapter } from './your-wagmi-setup';

setWagmiAdapter(wagmiAdapter);
```

### Structure

- `components/Widget/` - Main widget and all UI components
- `presale-gg/` - All blockchain logic, API, stores, web3 utilities
- `ui/` - Reusable UI components (Button, Input)
- `assets/` - Icons and assets
- `constants/` - Constants
- `lib/` - Utility functions
- `config.ts` - Configuration setup

### Required Dependencies

The widget requires these dependencies (should be in your package.json):
- `@wagmi/core`
- `@reown/appkit`
- `@reown/appkit-adapter-wagmi`
- `wagmi`
- `viem`
- `nanostores`
- `@nanostores/react`
- `next-intl`
- `sonner`
- `clsx`
- `lucide-react`
- `axios`
- `decimal.js`
- And other dependencies from the original project

### Environment Variables

- `NEXT_PUBLIC_PROJECT_ID` - WalletConnect project ID (required)

### Note

This package is self-contained with all blockchain logic included. All imports use relative paths within the package.
