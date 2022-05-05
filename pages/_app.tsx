import '../styles/global.css'
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from '@thirdweb-dev/react';

function MyApp({ Component, pageProps }: AppProps) {
  const desiredChainId = 1;

  return (
    <ThirdwebProvider desiredChainId={desiredChainId}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  )
}

export default MyApp