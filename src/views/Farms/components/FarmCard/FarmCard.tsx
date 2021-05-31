import React, { useMemo, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Flex, Text, Skeleton } from 'yogi-uikit_rc';
import { provider } from 'web3-core';
import useI18n from 'hooks/useI18n';
import { Farm } from 'state/types';
import ExpandableSectionButton from 'components/ExpandableSectionButton';

import DetailsSection from './DetailsSection';
import CardHeading from './CardHeading';
import CardActionsContainer from './CardActionsContainer';
import ApyButton from './ApyButton';

import { getFarmApr } from 'utils/apr';
import { useGetApiPrice } from 'state/hooks';
import { BigNumber } from 'bignumber.js';

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 32px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`;

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 32px;
  box-shadow: 0px 2px 12px -8px rgba(25, 19, 38, 0.1), 0px 1px 1px rgba(25, 19, 38, 0.05);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 24px;
  position: relative;
  text-align: center;
`;

const Divider = styled.div`
  background-color: ${({ theme }) => theme.colors.borderColor};
  height: 1px;
  margin: 28px auto;
  width: 100%;
`;

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`;

interface FarmCardProps {
  farm: Farm;
  ethereum?: provider;
  account?: string;
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, ethereum, account }) => {
  const TranslateString = useI18n();

  const [showExpandableSection, setShowExpandableSection] = useState(false);

  const earnLabel = 'YOGI';
  const yogiPrice = useGetApiPrice('YOGI');

  const apr = getFarmApr(farm.poolWeight, new BigNumber(farm.yogiPerBlock), new BigNumber(yogiPrice), farm.liquidity);
  const farmAPR = apr ? apr.toFixed(2) : 0;

  return (
    <FCard>
      {farm.pid === 0 && <StyledCardAccent />}
      <CardHeading farm={farm} />

      <Flex justifyContent="space-between" alignItems="center">
        <Text>{TranslateString(352, 'APR')}:</Text>
        <Text bold style={{ display: 'flex', alignItems: 'center' }}>
          {farm.liquidity ? (
            <>
              <ApyButton farm={farm} />
              {farmAPR}%
            </>
          ) : (
            <Skeleton height={24} width={80} />
          )}
        </Text>
      </Flex>

      <Flex justifyContent="space-between" style={{ marginBottom: 12 }}>
        <Text>{TranslateString(318, 'Earn')}:</Text>
        <Text bold>{earnLabel}</Text>
      </Flex>

      <CardActionsContainer farm={farm} ethereum={ethereum} account={account} />
      <Divider />
      <ExpandableSectionButton onClick={() => setShowExpandableSection(!showExpandableSection)} expanded={showExpandableSection} />
      <ExpandingWrapper expanded={showExpandableSection}>
        <DetailsSection farm={farm} />
      </ExpandingWrapper>
    </FCard>
  );
};

export default FarmCard;
