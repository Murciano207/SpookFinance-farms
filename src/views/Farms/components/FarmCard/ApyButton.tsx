import React from 'react';
import { CalculateIcon, IconButton, useModal } from 'yogi-uikit_rc';
import ApyCalculatorModal from './ApyCalculatorModal';
import { Farm } from 'state/types';

export interface ApyButtonProps {
  farm: Farm;
}

const ApyButton: React.FC<ApyButtonProps> = ({ farm }) => {
  const [onPresentApyModal] = useModal(<ApyCalculatorModal farm={farm} />);

  return (
    <IconButton onClick={onPresentApyModal} variant="text" size="sm" ml="4px">
      <CalculateIcon />
    </IconButton>
  );
};

export default ApyButton;
