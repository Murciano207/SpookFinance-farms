import React, { useMemo, useState, useCallback } from 'react';
import styled from 'styled-components';
import { provider } from 'web3-core';
import { getContract } from 'utils/erc20';
import { Button, Flex, Text } from 'yogi-uikit_rc';
import { Farm } from 'state/types';
import { useFarmFromPid, useFarmUser } from 'state/hooks';
import useI18n from 'hooks/useI18n';
import UnlockButton from 'components/UnlockButton';
import { useApprove } from 'hooks/useApprove';
import StakeAction from './StakeAction';
import HarvestAction from './HarvestAction';

const Action = styled.div`
  padding-top: 16px;
`;

interface FarmCardActionsProps {
  farm: Farm;
  ethereum?: provider;
  account?: string;
}

const CardActions: React.FC<FarmCardActionsProps> = ({ farm, ethereum, account }) => {
  const TranslateString = useI18n();
  const [requestedApproval, setRequestedApproval] = useState(false);
  const { pid, address } = useFarmFromPid(farm.pid);
  const { allowance, tokenBalance, stakedBalance, earnings } = useFarmUser(pid);
  const isApproved = account && allowance && allowance.isGreaterThan(0);

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, address);
  }, [ethereum, address]);

  const { onApprove } = useApprove(lpContract);

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true);
      await onApprove();
      setRequestedApproval(false);
    } catch (e) {
      console.error(e);
    }
  }, [onApprove]);

  const renderApprovalOrStakeButton = () => {
    return isApproved ? (
      <StakeAction stakedBalance={stakedBalance} tokenBalance={tokenBalance} tokenName={farm.symbol} pid={pid} />
    ) : (
      <Button style={{ width: '100%' }} mt="8px" disabled={requestedApproval} onClick={handleApprove}>
        {TranslateString(999, 'Approve Contract')}
      </Button>
    );
  };

  return (
    <Action>
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {/* TODO: Is there a way to get a dynamic value here from useFarmFromSymbol? */}
          YOGI
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {TranslateString(999, 'Earned')}
        </Text>
      </Flex>
      <HarvestAction earnings={earnings} pid={pid} />
      <Flex>
        <Text bold textTransform="uppercase" color="secondary" fontSize="12px" pr="3px">
          {farm.symbol}
        </Text>
        <Text bold textTransform="uppercase" color="textSubtle" fontSize="12px">
          {TranslateString(999, 'Staked')}
        </Text>
      </Flex>
      {!account ? <UnlockButton mt="8px" /> : renderApprovalOrStakeButton()}
    </Action>
  );
};

export default CardActions;
