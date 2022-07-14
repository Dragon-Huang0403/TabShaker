import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactLoading from 'react-loading';
import 'swiper/css';
import styled from 'styled-components';
import { getCard } from '../../utils/firebase';
import type { EnglishWordData } from '../../types/WidgetTypes';
import EnglishWord from './EnglishWord';
import { SwiperButtonNext, SwiperButtonPrev } from '../../Swiper';
import { DoubleArrow, Refresh } from '../../components/Icons';
import useLocalStorage from '../../hooks/useLocalStorage';
import { handleNewEnglishWords } from './utils';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  & > .swiper {
    width: 100%;
    height: 100%;
  }
`;

const IconsContainer = styled.div`
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

interface EnglishCardProps {
  data: {
    tag: string[];
  };
}

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  border-radius: 10px;
  top: 0;
  z-index: 10;
  background: ${({ theme }) => theme.color.littleTransparentBlack};
`;

function EnglishCard({ data }: EnglishCardProps) {
  const [words, setWords] = useLocalStorage<EnglishWordData[]>('engWords', []);
  const [activeSlide, setActiveSlide] = useLocalStorage(
    'engCardActiveSlide',
    0,
  );
  const [isLoading, setIsLoading] = useState(false);
  const { tag } = data;

  const updateWords = async () => {
    setIsLoading(true);
    const res = await getCard(10, tag);
    const newEnglishWords = handleNewEnglishWords(res);
    setWords(newEnglishWords);
    const currentTime = new Date().getTime();
    window.localStorage.setItem('wordsUpdatedAt', String(currentTime));
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
        simulateTouch={false}
        loop
        initialSlide={activeSlide}
        onSlideChange={(e) => {
          setActiveSlide(e.activeIndex);
        }}
      >
        {words.map((word) => (
          <SwiperSlide key={word.id}>
            <EnglishWord word={word} tags={tag} />
          </SwiperSlide>
        ))}
        <IconsContainer>
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
      {isLoading && (
        <LoadingWrapper>
          <ReactLoading type="spin" />
        </LoadingWrapper>
      )}
    </Wrapper>
  );
}

export default EnglishCard;
