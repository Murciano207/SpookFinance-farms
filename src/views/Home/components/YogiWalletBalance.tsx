import React from 'react';
import { Text } from 'yogi-uikit_rc';
import { useWallet } from 'use-wallet';
import useTokenBalance from 'hooks/useTokenBalance';
import useI18n from 'hooks/useI18n';
import { getAddress } from 'utils/addressHelpers';
import { getBalanceNumber } from 'utils/formatBalance';
import CardValue from './CardValue';

const YogiWalletBalance: React.FC = () => {
  const TranslateString = useI18n();
  const yogiBalance = useTokenBalance(getAddress('yogi'));
  const { account } = useWallet();

  if (!account) {
    return (
      <Text color="textDisabled" style={{ lineHeight: '36px' }}>
        {TranslateString(298, 'Locked')}
      </Text>
    );
  }

  return <CardValue value={getBalanceNumber(yogiBalance)} fontSize="24px" />;
};

export default YogiWalletBalance;
