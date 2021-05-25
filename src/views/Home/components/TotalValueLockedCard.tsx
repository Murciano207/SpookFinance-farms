import React from 'react';
import styled from 'styled-components';
import { Card, CardBody, Heading, Text } from 'yogi-uikit_rc';
import useI18n from 'hooks/useI18n';
import { useTotalValue } from '../../../state/hooks';
import CardValue from './CardValue';

const StyledTotalValueLockedCard = styled(Card)`
  align-items: center;
  display: flex;
  flex: 1;
`;

const TotalValueLockedCard: React.FC = () => {
  const TranslateString = useI18n();
  const totalValue = useTotalValue();

  return (
    <StyledTotalValueLockedCard>
      <CardBody>
        <Heading size="lg" mb="24px">
          {TranslateString(999, 'Total Value Locked (TVL)')}
        </Heading>
        <>
          <CardValue value={totalValue} prefix="$" decimals={2} />
          <Text color="textSubtle">{TranslateString(999, 'Across all Farms')}</Text>
        </>
      </CardBody>
    </StyledTotalValueLockedCard>
  );
};

export default TotalValueLockedCard;
