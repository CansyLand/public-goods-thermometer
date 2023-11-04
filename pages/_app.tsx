import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import {  mainnet } from 'wagmi/chains'


// 1. Get projectId
const projectId = 'YOUR_PROJECT_ID'

// 2. Create wagmiConfig
const metadata = {
  name: 'Web3Modal',
  description: 'Web3Modal Example',
  url: 'https://web3modal.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
}

const chains = [mainnet]
const wagmiConfig = defaultWagmiConfig({ chains, projectId, metadata })


// 3. Create modal
const themeVariables = { 
  // '--w3m-color-mix': '#00BB7F',
  // '--w3m-color-mix-strength': 100,
  '--w3m-accent': '#570DF8'}
createWeb3Modal({ wagmiConfig, projectId, chains, themeVariables })


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
