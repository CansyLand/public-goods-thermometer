import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { createWeb3Modal, defaultWagmiConfig } from '@web3modal/wagmi/react'
import { WagmiConfig } from 'wagmi'
import {  mainnet } from 'wagmi/chains'


// 1. Get projectId
const projectId = '6d17bd295459b52adb39c8467bfdf5ef'

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
  '--w3m-accent': '#570DF8',
  '--wcm-button-border-radius': '2px'}
createWeb3Modal({ wagmiConfig, projectId, chains, themeVariables })


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;



// import { useEffect, useState } from "react";
// import type { AppProps } from "next/app";
// import { RainbowKitProvider, darkTheme, lightTheme } from "@rainbow-me/rainbowkit";
// import "@rainbow-me/rainbowkit/styles.css";
// import NextNProgress from "nextjs-progressbar";
// import { Toaster } from "react-hot-toast";
// import { useDarkMode } from "usehooks-ts";
// import { WagmiConfig } from "wagmi";
// import { Footer } from "~~/components/Footer";
// import { Header } from "~~/components/Header";
// import { BlockieAvatar } from "~~/components/scaffold-eth";
// import { useNativeCurrencyPrice } from "~~/hooks/scaffold-eth";
// import { useGlobalState } from "~~/services/store/store";
// import { wagmiConfig } from "~~/services/web3/wagmiConfig";
// import { appChains } from "~~/services/web3/wagmiConnectors";
// import "~~/styles/globals.css";

// const ScaffoldEthApp = ({ Component, pageProps }: AppProps) => {
//   const price = useNativeCurrencyPrice();
//   const setNativeCurrencyPrice = useGlobalState(state => state.setNativeCurrencyPrice);
//   // This variable is required for initial client side rendering of correct theme for RainbowKit
//   const [isDarkTheme, setIsDarkTheme] = useState(true);
//   const { isDarkMode } = useDarkMode();

//   useEffect(() => {
//     if (price > 0) {
//       setNativeCurrencyPrice(price);
//     }
//   }, [setNativeCurrencyPrice, price]);

//   useEffect(() => {
//     setIsDarkTheme(isDarkMode);
//   }, [isDarkMode]);

//   return (
//     <WagmiConfig config={wagmiConfig}>
//       <NextNProgress />
//       <RainbowKitProvider
//         chains={appChains.chains}
//         avatar={BlockieAvatar}
//         theme={isDarkTheme ? darkTheme() : lightTheme()}
//       >
//         <div className="flex flex-col min-h-screen">
//           <Header />
//           <main className="relative flex flex-col flex-1">
//             <Component {...pageProps} />
//           </main>
//           <Footer />
//         </div>
//         <Toaster />
//       </RainbowKitProvider>
//     </WagmiConfig>
//   );
// };

// export default ScaffoldEthApp;
