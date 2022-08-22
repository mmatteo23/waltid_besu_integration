import { ChakraProvider, theme } from '@chakra-ui/react';
import { WagmiConfig } from 'wagmi';
import { wagmiClient, chains } from './utils/WagmiClient';
import './styles/App.css';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Holder from './components/Holder';
import Issuer from './components/Issuer';
import Verifier from './components/Verifier';
import TrustedContracts from './components/TrustedContracts';
import DiplomaUseCase from './components/DiplomaUseCase';
import Ebsi from './components/Ebsi';
import Nav from './components/Nav';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains}>
          <BrowserRouter>
            <Routes>
                <Route path="*" element={<Navigate to="/holder/keys" replace={true} />}/>
                <Route path="/" element={<Nav/>}>
                  <Route path="" element={<Navigate to="/holder/keys" replace={true} />} />
                  <Route path="holder/*" element={<Holder />} />
                  <Route path="issuer" element={<Issuer />} />
                  <Route path="verifier" element={<Verifier />} />
                  <Route path="contracts" element={<TrustedContracts />} />
                  <Route path="diploma" element={<DiplomaUseCase />} />
                  <Route path="ebsi" element={<Ebsi />} />
                </Route>
            </Routes>
          </BrowserRouter>
          {/* <MyBreadcrumb /> */}
        </RainbowKitProvider>
      </WagmiConfig>
    </ChakraProvider>
  );
}

export default App;
