import React from 'react';
import { ModalProvider } from 'yogi-uikit_rc';
import { UseWalletProvider } from 'use-wallet';
import { Provider } from 'react-redux';
import getRpcUrl from 'utils/getRpcUrl';
import { LanguageContextProvider } from 'contexts/Localisation/languageContext';
import { ThemeContextProvider } from 'contexts/ThemeContext';
import { BlockContextProvider } from 'contexts/BlockContext';
import { RefreshContextProvider } from 'contexts/RefreshContext';
import store from 'state';

const Providers: React.FC = ({ children }) => {
  const rpcUrl = getRpcUrl();
  const chainId = parseInt(process.env.REACT_APP_CHAIN_ID);
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <LanguageContextProvider>
          <UseWalletProvider
            chainId={chainId}
            connectors={{
              injected: {},
              walletconnect: { rpcUrl },
            }}
          >
            <BlockContextProvider>
              <RefreshContextProvider>
                <ModalProvider>{children}</ModalProvider>
              </RefreshContextProvider>
            </BlockContextProvider>
          </UseWalletProvider>
        </LanguageContextProvider>
      </ThemeContextProvider>
    </Provider>
  );
};

export default Providers;
