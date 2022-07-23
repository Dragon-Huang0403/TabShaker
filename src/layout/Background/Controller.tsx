import React from 'react';
import styled from 'styled-components';

import {
  ArrowBack,
  ArrowForward,
  PlayArrow,
  Pause,
} from '../../components/Icons';

const IconsWrapper = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.color.transparentBlack};
  z-index: 1;
  margin-bottom: 20px;
  padding: 5px 15px;
  border-radius: 20px;
  display: flex;
  gap: 5px;

  &:hover {
    box-shadow: 0px 0px 10px -2px ${({ theme }) => theme.color.white};
  }
`;

const IconStyle = styled.div`
  width: 24px;
  height: 24px;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.transparentWhite};
    border-radius: 50%;
  }
  & svg {
    fill: ${({ theme }) => theme.color.lightBlue};
    width: 100%;
    height: 100%;
  }
`;

interface ControllerProps {
  isPlay: boolean;
  setIsPlay: (isPlay: boolean) => void;
  setCurrentPhoto: (currentPhoto: number) => void;
  nextPhoto: number;
  prevPhoto: number;
}

function Controller({
  isPlay,
  nextPhoto,
  prevPhoto,
  setIsPlay,
  setCurrentPhoto,
}: ControllerProps) {
  return (
    <IconsWrapper>
      <IconStyle
        onClick={() => {
          setCurrentPhoto(prevPhoto);
        }}
      >
        <ArrowBack />
      </IconStyle>
      {isPlay ? (
        <IconStyle
          onClick={() => {
            setIsPlay(false);
          }}
        >
          <Pause />
        </IconStyle>
      ) : (
        <IconStyle
          onClick={() => {
            setIsPlay(true);
          }}
        >
          <PlayArrow />
        </IconStyle>
      )}
      <IconStyle
        onClick={() => {
          setCurrentPhoto(nextPhoto);
        }}
      >
        <ArrowForward />
      </IconStyle>
    </IconsWrapper>
  );
}

export default Controller;
