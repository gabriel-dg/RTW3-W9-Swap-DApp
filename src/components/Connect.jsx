import React from 'react';
import '@rainbow-me/rainbowkit/styles.css';
import { ConnectButton } from "@rainbow-me/rainbowkit";
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  darkTheme,
  Chain,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.polygonMumbai, chain.optimism, chain.optimismKovan, chain.arbitrum, chain.ropsten, chain.rinkeby, chain.goerli, chain.kovan, chain.localhost
    , chain.hardhat
  ],
  [
    alchemyProvider({ alchemyId: process.env.ALCHEMY_ID }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit',
  chains
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})

function Connect() {
  return (

    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        coolMode
        // theme={lightTheme({ borderRadius: 'medium', accentColor: '#57837B', accentColorForeground: '#F1ECC3' })}
        theme={darkTheme({borderRadius: 'medium', accentColor: '#57837B', accentColorForeground: '#F1ECC3'})}
        chains={chains}
      >
        <ConnectButton
          label="Connect your Wallet"
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full',
          }}
        />
      </RainbowKitProvider>
    </WagmiConfig>

  );
};

export default Connect;