import React from 'react';
import styled from 'styled-components';

import { DoubleArrow, Refresh } from '../../components/Icons';
import { SwiperButtonNext, SwiperButtonPrev } from '../../components/Swiper';

const Wrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 5;
  display: flex;
  gap: 5px;

  & div:not(:last-child) {
    visibility: hidden;
  }

  & svg {
    fill: ${({ theme }) => theme.color.transparentWhite};
  }
  :hover {
    & div:not(:last-child) {
      visibility: visible;
    }

    & svg {
      fill: ${({ theme }) => theme.color.lightWhite};
    }
  }
`;

const IconWrapper = styled.div`
  padding: 2px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;

  & > button {
    background: transparent;
    border: none;
    padding: 0;
    width: 100%;
    height: 100%;
    cursor: pointer;
  }

  &:hover {
    background: ${({ theme }) => theme.color.transparentWhite};
  }
  &:hover svg {
    fill: ${({ theme }) => theme.color.white};
  }

  & svg {
    width: 24px;
    height: 24px;
  }
`;

interface ControllerProps {
  updateWords: () => void;
}

function Controller({ updateWords }: ControllerProps) {
  return (
    <Wrapper>
      <IconWrapper>
        <SwiperButtonPrev>
          <DoubleArrow direction="left" />
        </SwiperButtonPrev>
      </IconWrapper>
      <IconWrapper onClick={updateWords}>
        <Refresh />
      </IconWrapper>
      <IconWrapper>
        <SwiperButtonNext>
          <DoubleArrow direction="right" />
        </SwiperButtonNext>
      </IconWrapper>
    </Wrapper>
  );
}

export default Controller;
