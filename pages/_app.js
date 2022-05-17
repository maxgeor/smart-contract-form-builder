import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';
import {
  chains,
  wagmiClient,
  WagmiProvider,
  RainbowKitProvider,
} from '../lib/rainbowKit';

function App({ Component, pageProps }) {
  return (
    <WagmiProvider client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiProvider>
  );
}

export default App
