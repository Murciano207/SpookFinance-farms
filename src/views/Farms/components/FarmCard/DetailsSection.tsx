import React from 'react';
import useI18n from 'hooks/useI18n';
import styled from 'styled-components';
import { Text, Flex, Link, LinkExternal } from 'yogi-uikit_rc';
import { commarize } from 'utils/commarize';
import { Farm } from 'state/types';

export interface ExpandableSectionProps {
  farm: Farm;
}

const Wrapper = styled.div`
  margin-top: 24px;
`;

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`;

const DetailsSection: React.FC<ExpandableSectionProps> = ({ farm }) => {
  const TranslateString = useI18n();

  // FIXME: maybe here we need to show staked, not liquidity
  const totalValueFormated = `$ ${commarize(farm.liquidity)}`;
  const explorerUrl = `${process.env.REACT_APP_EXPLORER}/token/${farm.address}`;
  const poolUrl = `${process.env.REACT_APP_POOLS}/#/pool/${farm.address}`;

  return (
    <Wrapper>
      <Flex justifyContent="space-between">
        <Text>{TranslateString(316, 'Stake')}:</Text>
        <StyledLinkExternal href={poolUrl}>{farm.symbol}</StyledLinkExternal>
      </Flex>

      <Flex justifyContent="space-between">
        <Text>{TranslateString(23, 'Total Liquidity')}:</Text>
        <Text>{totalValueFormated}</Text>
      </Flex>

      <Flex justifyContent="flex-start">
        <Link external href={explorerUrl} bold={false}>
          {TranslateString(356, 'View on explorer')}
        </Link>
      </Flex>
    </Wrapper>
  );
};

export default DetailsSection;
