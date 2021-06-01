import React, { useState, useEffect } from 'react';
import { Card, CardBody, Heading, Text } from 'yogi-uikit_rc';
import BigNumber from 'bignumber.js/bignumber';
import styled from 'styled-components';
import { getBalanceNumber } from 'utils/formatBalance';
import { useSupply } from 'hooks/useTokenBalance';
import useI18n from 'hooks/useI18n';
import CardValue from './CardValue';
import { useFarms, useGetApiPrice } from '../../../state/hooks';

const StyledYogiStats = styled(Card)`
  margin-left: auto;
  margin-right: auto;
`;

const Row = styled.div`
  align-items: center;
  display: flex;
  font-size: 14px;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const YogiStats: React.FC = () => {
  const TranslateString = useI18n();
  const { supply, totalSupply, burned } = useSupply();
  const farms = useFarms();
  const yogiPrice = useGetApiPrice('YOGI');
  const [marketCap, setMarketCap] = useState(0);
  const yogiPerBlock = new BigNumber(farms[0].yogiPerBlock);

  useEffect(() => {
    const newMarketCap = getBalanceNumber(new BigNumber(yogiPrice).times(supply));
    setMarketCap(newMarketCap);
  }, [yogiPrice, supply]);

  return (
    <StyledYogiStats>
      <CardBody>
        <Heading size="xl" mb="24px">
          {TranslateString(534, 'YOGI Stats')}
        </Heading>
        <Row>
          <Text fontSize="14px">{TranslateString(999, 'Market Cap')}</Text>
          <CardValue fontSize="14px" value={marketCap} decimals={0} prefix="$" />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(537, 'Circulating Supply')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(supply)} decimals={0} />
        </Row>
        {/* <Row>
          <Text fontSize="14px">{TranslateString(538, 'YOGI Burned')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(burned)} decimals={0} />
        </Row> */}
        <Row>
          <Text fontSize="14px">{TranslateString(536, 'Total Supply')}</Text>
          <CardValue fontSize="14px" value={getBalanceNumber(totalSupply)} decimals={0} />
        </Row>
        <Row>
          <Text fontSize="14px">{TranslateString(540, 'New YOGI/block')}</Text>
          <Text bold fontSize="14px">
            {farms[0].yogiPerBlock === undefined ? 0 : yogiPerBlock.div(1e18).toNumber()}
          </Text>
        </Row>
      </CardBody>
    </StyledYogiStats>
  );
};

export default YogiStats;
