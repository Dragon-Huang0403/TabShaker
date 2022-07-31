import React from 'react';
import styled from 'styled-components';

import TextWrapper from './TextWrapper';

const Wrapper = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;
  font-weight: 800;
  color: ${({ theme }) => theme.color.white};
`;

function TimeWrapper({ time }: { time: string }) {
  return (
    <Wrapper>
      <TextWrapper side="top" text={time} />
      <TextWrapper side="bottom" text={time} />
    </Wrapper>
  );
}

export default TimeWrapper;
