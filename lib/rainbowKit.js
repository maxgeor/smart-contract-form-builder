import { chain, createClient, WagmiProvider } from 'wagmi';
import {
  apiProvider,
  configureChains,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';


const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    apiProvider.alchemy(process.env.ALCHEMY_ID),
    apiProvider.fallback()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'Formie',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

export {
  chains,
  wagmiClient,
  WagmiProvider,
  RainbowKitProvider,
}