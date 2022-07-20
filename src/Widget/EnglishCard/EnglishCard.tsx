import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import ReactLoading from 'react-loading';

import Controller from './Controller';
import { getCard } from './fireStore';
import EnglishWord, { EnglishWordData } from './EnglishWord';
import { handleNewEnglishWords, afterOneDay } from './utils';

import { useLocalStorage } from '../../hooks';

import 'swiper/css';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;

  & > .swiper {
    width: 100%;
    height: 100%;
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
        <Controller updateWords={updateWords} />
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
