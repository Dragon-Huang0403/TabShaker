import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  flex-grow: 1;
  height: 100%;
  font-weight: 800;
  color: ${({ theme }) => theme.white};
`;

const TopWrapper = styled.div`
  background: ${({ theme }) => theme.transparentBlack};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  height: 49%;
  width: 100%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;

  & > svg {
    position: absolute;
    top: 0%;
    width: 85%;
    height: 200%;
    fill: white;
  }
`;
const BottomWrapper = styled.div`
  background: ${({ theme }) => theme.transparentBlack};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 49%;
  width: 100%;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  overflow: hidden;

  & > svg {
    position: absolute;
    bottom: 0%;
    width: 85%;
    height: 200%;
    fill: white;
  }
`;

function TimeWrapper({ time }: { time: string }) {
  return (
    <Wrapper>
      <TopWrapper>
        <svg height="18" width="18" viewBox="0 0 18 18">
          <text x="0" y="15">
            {time}
          </text>
        </svg>
      </TopWrapper>
      <BottomWrapper>
        <svg height="18" width="18" viewBox="0 0 18 18">
          <text x="0" y="15">
            {time}
          </text>
        </svg>
      </BottomWrapper>
    </Wrapper>
  );
}

export default TimeWrapper;
