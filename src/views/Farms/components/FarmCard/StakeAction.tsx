import React from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { Button, Flex, Heading, IconButton, MinusIcon, AddIcon, useModal } from 'yogi-uikit_rc';

import useI18n from 'hooks/useI18n';
import useStake from 'hooks/useStake';
import useUnstake from 'hooks/useUnstake';
import { getBalanceNumber } from 'utils/formatBalance';
import DepositModal from '../DepositModal';
import WithdrawModal from '../WithdrawModal';

interface FarmCardActionsProps {
  stakedBalance?: BigNumber;
  tokenBalance?: BigNumber;
  tokenName?: string;
  pid?: number;
}

const IconButtonWrapper = styled.div`
  display: flex;
  svg {
    width: 20px;
  }
`;

const StakeAction: React.FC<FarmCardActionsProps> = ({ tokenBalance, stakedBalance, tokenName, pid }) => {
  const TranslateString = useI18n();
  const { onStake } = useStake(pid);
  const { onUnstake } = useUnstake(pid);

  const rawTokenBalance = getBalanceNumber(tokenBalance);
  const displayTokenBalance = rawTokenBalance.toLocaleString();

  const rawStakedBalance = getBalanceNumber(stakedBalance);
  const displayStakedBalance = rawStakedBalance.toLocaleString();

  const [onPresentDeposit] = useModal(<DepositModal max={tokenBalance} onConfirm={onStake} tokenName={tokenName} />);
  const [onPresentWithdraw] = useModal(<WithdrawModal max={stakedBalance} onConfirm={onUnstake} tokenName={tokenName} />);

  const renderStakingButtons = () => {
    return rawStakedBalance === 0 ? (
      <Button style={{ width: 107.72 }} onClick={onPresentDeposit}>
        {TranslateString(999, 'Stake')}
      </Button>
    ) : (
      <IconButtonWrapper>
        <IconButton style={{ width: 52 }} variant="tertiary" onClick={onPresentWithdraw} mr="6px">
          <MinusIcon color="primary" />
        </IconButton>
        <IconButton style={{ width: 52 }} variant="tertiary" onClick={onPresentDeposit}>
          <AddIcon color="primary" />
        </IconButton>
      </IconButtonWrapper>
    );
  };

  const renderUnstakingButtons = () => {
    return (
      <Button style={{ width: 107.72 }} onClick={onPresentWithdraw}>
        Unstake
      </Button>
    );
  };

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Heading color={rawTokenBalance === 0 ? 'textDisabled' : 'text'}>{displayTokenBalance}</Heading>
      {renderStakingButtons()}
      <Heading color={rawStakedBalance === 0 ? 'textDisabled' : 'text'}>{displayStakedBalance}</Heading>
      {renderUnstakingButtons()}
    </Flex>
  );
};

export default StakeAction;
