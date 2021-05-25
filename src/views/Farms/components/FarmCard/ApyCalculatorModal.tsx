import React from 'react';
import styled from 'styled-components';
import { Modal, Text, LinkExternal, Flex } from 'yogi-uikit_rc';
import useI18n from 'hooks/useI18n';
import { estimateCompound, apyModalRoi } from 'utils/compoundApyHelpers';
import { Farm } from 'state/types';
import { useGetApiPrice } from 'state/hooks';
import { getFarmApy } from 'utils/apy';
import BigNumber from 'bignumber.js';

interface ApyCalculatorModalProps {
  onDismiss?: () => void;
  farm: Farm;
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(4, auto);
  margin-bottom: 24px;
`;

const GridItem = styled.div`
  margin-bottom: '10px';
`;

const Description = styled(Text)`
  max-width: 320px;
  margin-bottom: 28px;
`;

const ApyCalculatorModal: React.FC<ApyCalculatorModalProps> = ({ onDismiss, farm }) => {
  const TranslateString = useI18n();

  const yogiPrice = useGetApiPrice('YOGI');
  const poolUrl = `${process.env.REACT_APP_POOLS}/#/pool/${farm.address}`;

  const apy = getFarmApy(farm.poolWeight, new BigNumber(farm.yogiPerBlock), new BigNumber(yogiPrice), farm.liquidity);
  const farmApy = apy * 100;
  const principal = 1000 / yogiPrice;

  const compound1D = estimateCompound({ numberOfDays: 1, farmApy, yogiPrice });
  const compound7D = estimateCompound({ numberOfDays: 7, farmApy, yogiPrice });
  const compound30D = estimateCompound({ numberOfDays: 30, farmApy, yogiPrice });
  const compound365D = estimateCompound({ numberOfDays: 365, farmApy, yogiPrice });

  return (
    <Modal title="ROI" onDismiss={onDismiss}>
      <Grid>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'Timeframe')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'ROI')}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="12px" bold color="textSubtle" textTransform="uppercase" mb="20px">
            {TranslateString(999, 'YOGI per $1000')}
          </Text>
        </GridItem>
        {/* 1 day row */}
        <GridItem>
          <Text>1d</Text>
        </GridItem>
        <GridItem>
          <Text>{apyModalRoi({ amountEarned: compound1D, amountInvested: principal })}%</Text>
        </GridItem>
        <GridItem>
          <Text>{compound1D}</Text>
        </GridItem>
        {/* 7 day row */}
        <GridItem>
          <Text>7d</Text>
        </GridItem>
        <GridItem>
          <Text>{apyModalRoi({ amountEarned: compound7D, amountInvested: principal })}%</Text>
        </GridItem>
        <GridItem>
          <Text>{compound7D}</Text>
        </GridItem>
        {/* 30 day row */}
        <GridItem>
          <Text>30d</Text>
        </GridItem>
        <GridItem>
          <Text>{apyModalRoi({ amountEarned: compound30D, amountInvested: principal })}%</Text>
        </GridItem>
        <GridItem>
          <Text>{compound30D}</Text>
        </GridItem>
        {/* 365 day / APY row */}
        <GridItem>
          <Text>365d(APY)</Text>
        </GridItem>
        <GridItem>
          <Text>{apyModalRoi({ amountEarned: compound365D, amountInvested: principal })}%</Text>
        </GridItem>
        <GridItem>
          <Text>{compound365D}</Text>
        </GridItem>
      </Grid>
      <Description fontSize="12px" color="textSubtle">
        {TranslateString(999, 'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.')}
      </Description>

      <Flex justifyContent="center">
        <LinkExternal href={poolUrl}>
          {TranslateString(999, 'Get')} {farm.symbol}
        </LinkExternal>
      </Flex>
    </Modal>
  );
};

export default ApyCalculatorModal;
