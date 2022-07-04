import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactLoading from 'react-loading';
import 'swiper/css';
import 'swiper/css/effect-creative';
import { EffectCreative } from 'swiper';
import styled, { css } from 'styled-components';
import { getCard } from '../../utils/firebase';
import { getAudioUrl } from '../../utils/lib';
import type { EnglishWordData } from '../../types/WidgetTypes';
import EnglishWord from './EnglishWord';
import { SwiperButtonNext, SwiperButtonPrev } from '../../Swiper';
import { DoubleArrow, Refresh } from '../../components/Icons';
import { useHover } from '../../hooks';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  & > .swiper {
    width: 100%;
    height: 100%;
  }
`;

const IconsContainer = styled.div<{ isIConHover: boolean }>`
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

  ${({ isIConHover }) =>
    isIConHover &&
    css`
      & div:not(:last-child) {
        visibility: visible;
      }

      & svg {
        fill: ${({ theme }) => theme.color.lightWhite};
      }
    `}
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

interface EnglishCardProps {
  data: {
    tag: string[];
  };
}

const LoadingWrapper = styled.div<{ isLoading: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 10px;
  top: 0;
  z-index: -100;
  ${({ isLoading }) =>
    isLoading &&
    css`
      background: ${({ theme }) => theme.color.black};
      z-index: 10;
    `}
`;

function EnglishCard({ data }: EnglishCardProps) {
  const [words, setWords] = useState<EnglishWordData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const hoverRef = useRef<HTMLDivElement>(null);
  const isIConHover = useHover(hoverRef);
  const { tag } = data;

  const playAudio = async (word: string) => {
    const audio = new Audio(getAudioUrl(word));
    audio.play();
  };
  const updateWords = () => {
    setIsLoading(true);
    getCard(10, tag).then((res) => {
      setWords(res as EnglishWordData[]);
      window.localStorage.setItem('engWords', JSON.stringify(res));
      const currentTime = new Date().getTime();
      window.localStorage.setItem('wordsUpdatedAt', String(currentTime));
    });
  };
  useEffect(() => {
    const rawOldWords = window.localStorage.getItem('engWords');
    if (rawOldWords) {
      const wordsUpdatedAt = localStorage.getItem('wordsUpdatedAt');
      const currentTime = new Date().getTime();
      if (!wordsUpdatedAt || currentTime - Number(wordsUpdatedAt) <= 86400000) {
        const oldWords = JSON.parse(rawOldWords);
        setWords(oldWords);
        return;
      }
    }
    updateWords();
  }, []);
  useEffect(() => {
    if (isLoading === false) return undefined;
    const id = setInterval(() => {
      setIsLoading(false);
    }, 500);
    return () => clearInterval(id);
  }, [isLoading]);
  return (
    <Wrapper>
      <Swiper
        grabCursor
        effect="creative"
        creativeEffect={{
          prev: {
            shadow: true,
            translate: [0, 0, -400],
          },
          next: {
            translate: ['100%', 0, 0],
          },
        }}
        loop
        modules={[EffectCreative]}
      >
        {words.map((word) => (
          <SwiperSlide key={word.id}>
            <EnglishWord word={word} playAudio={playAudio} tags={tag} />
          </SwiperSlide>
        ))}
        <IconsContainer ref={hoverRef} isIConHover={isIConHover}>
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
        </IconsContainer>
      </Swiper>
      <LoadingWrapper isLoading={isLoading}>
        <ReactLoading type="spin" />
      </LoadingWrapper>
    </Wrapper>
  );
}

export default EnglishCard;
