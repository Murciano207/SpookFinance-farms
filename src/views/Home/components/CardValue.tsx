import React, { useEffect } from 'react';
import { useCountUp } from 'react-countup';
import { Text } from 'yogi-uikit_rc';

interface CardValueProps {
  value: number;
  decimals?: number;
  fontSize?: string;
  prefix?: string;
}

const CardValue: React.FC<CardValueProps> = ({ value, decimals, fontSize = '40px', prefix }) => {
  const { countUp, update } = useCountUp({
    start: 0,
    end: value,
    duration: 1,
    separator: ',',
    decimals:
      // eslint-disable-next-line no-nested-ternary
      decimals !== undefined ? decimals : value < 0 ? 4 : value > 1e5 ? 0 : 3,
  });

  useEffect(() => {
    update(value);
  }, [value, update]);

  return (
    <Text bold fontSize={fontSize}>
      {prefix}
      {countUp}
    </Text>
  );
};

export default CardValue;
