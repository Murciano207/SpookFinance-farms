import React, { useContext } from 'react';
import { useWallet } from 'use-wallet';
import { allLanguages } from 'config/localisation/languageCodes';
import { LanguageContext } from 'contexts/Localisation/languageContext';
import useTheme from 'hooks/useTheme';
import { useGetApiPrice } from 'state/hooks';
import { Menu as UikitMenu } from 'yogi-uikit_rc';
import config from './config';

const Menu = (props) => {
  const { account, connect, reset } = useWallet();
  const { selectedLanguage, setSelectedLanguage } = useContext(LanguageContext);
  const { isDark, toggleTheme } = useTheme();
  const yogiPrice = useGetApiPrice('YOGI');

  return (
    <UikitMenu
      account={account}
      login={connect}
      logout={reset}
      isDark={isDark}
      toggleTheme={toggleTheme}
      currentLang={selectedLanguage && selectedLanguage.code}
      langs={allLanguages}
      setLang={setSelectedLanguage}
      yogiPriceUsd={yogiPrice}
      links={config}
      {...props}
    />
  );
};

export default Menu;
