import React from 'react';
import styled from 'styled-components';

import RoundButton from './RoundButton';
import { AddIcon } from '../Icons';

const IconWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  svg {
    margin: auto;
    width: 32px;
    height: 32px;
  }
`;

interface RoundAddButtonProps {
  onClick: () => void;
}

function RoundAddButton({ onClick }: RoundAddButtonProps) {
  return (
    <RoundButton>
      <IconWrapper onClick={onClick}>
        <AddIcon />
      </IconWrapper>
    </RoundButton>
  );
}

export default RoundAddButton;
