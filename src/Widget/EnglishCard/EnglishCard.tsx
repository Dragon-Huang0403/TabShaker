import React, { useEffect, useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import ReactLoading from 'react-loading';
import 'swiper/css';
import styled from 'styled-components';
import { getCard } from '../../utils/firebase';
import EnglishWord, { EnglishWordData } from './EnglishWord';
import { SwiperButtonNext, SwiperButtonPrev } from '../../Swiper';
import { DoubleArrow, Refresh } from '../../components/Icons';
import useLocalStorage from '../../hooks/useLocalStorage';
import { handleNewEnglishWords, afterOneDay } from './utils';

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

interface EnglishCardProps {
  data: {
    tag: string[];
  };
}

const ENGLISH_WORDS_IN_ONE_DAY = 5;

function EnglishCard({ data }: EnglishCardProps) {
  const [words, setWords] = useLocalStorage<EnglishWordData[]>('engWords', []);
  const [activeSlide, setActiveSlide] = useLocalStorage(
    'engCardActiveSlide',
    0,
  );
  const [isLoading, setIsLoading] = useState(false);
  const prevTagLength = useRef(-1);
  const { tag } = data;

  const updateWords = async () => {
    setIsLoading(true);
    const res = await getCard(ENGLISH_WORDS_IN_ONE_DAY, tag);
    const newEnglishWords = handleNewEnglishWords(res);
    setWords(newEnglishWords);
    setIsLoading(false);
    window.localStorage.setItem('wordsUpdatedAt', String(new Date()));
  };

  useEffect(() => {
    if (words.length === 0) {
      updateWords();
      return;
    }
    const wordsUpdatedAt = localStorage.getItem('wordsUpdatedAt');
    if (wordsUpdatedAt && afterOneDay(wordsUpdatedAt)) {
      updateWords();
    }
  }, [words.length]);

  useEffect(() => {
    if (prevTagLength.current === -1) {
      prevTagLength.current = tag.length;
      return;
    }
    if (prevTagLength.current !== tag.length) {
      updateWords();
    }
  }, [tag.length]);

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
