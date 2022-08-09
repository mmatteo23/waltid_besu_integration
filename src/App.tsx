import { ChakraProvider, theme } from '@chakra-ui/react';
import React from 'react';
import { WagmiConfig } from 'wagmi';
import { wagmiClient, chains } from './utils/WagmiClient';
import './styles/App.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import Nav from './components/Nav';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <Nav />
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;
