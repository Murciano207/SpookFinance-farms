import React from 'react';
import styled from 'styled-components';
import { Tag, Flex, Heading, Image } from 'yogi-uikit_rc';
import { Farm } from 'state/types';
import { getFarmImage } from 'utils/farms';

export interface ExpandableSectionProps {
  farm: Farm;
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`;

const MultiplierTag = styled(Tag)`
  margin-left: 4px;
`;

const CardHeading: React.FC<ExpandableSectionProps> = ({ farm }) => {
  return (
    <Wrapper justifyContent="space-between" alignItems="center" mb="12px">
      <Flex flexDirection="column" alignItems="flex-start">
        <Heading mb="4px">{farm.symbol}</Heading>
        <Flex justifyContent="center">
          <MultiplierTag variant="secondary">{`${farm.multiplier}x`}</MultiplierTag>
        </Flex>
      </Flex>
      <Image src={getFarmImage(farm.address)} alt={farm.symbol} width={64} height={64} />
    </Wrapper>
  );
};

export default CardHeading;
