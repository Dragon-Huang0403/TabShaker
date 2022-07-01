import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCard } from '../../utils/firebase';
import { getAudioUrl } from '../../utils/lib';
import type { EnglishWordData } from '../../types/WidgetTypes';
import EnglishWord from './EnglishWord';
import { DoubleArrow } from '../../components/Icons';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const IconWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 10;
  padding: 2px;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.color.transparentWhite};
  }
  &:hover > svg {
    fill: ${({ theme }) => theme.color.lightWhite};
  }

  & > svg {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.color.transparentWhite};
  }
`;

function EnglishCard() {
  const [words, setWords] = useState<EnglishWordData[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const playAudio = async (word: string) => {
    const audio = new Audio(getAudioUrl(word));
    audio.play();
  };
  useEffect(() => {
    const oldWords = window.localStorage.getItem('engWords');
    if (oldWords) {
      setWords(JSON.parse(oldWords));
      return;
    }
    getCard(10, ['oxford_20000']).then((data) => {
      setWords(data as EnglishWordData[]);
      window.localStorage.setItem('engWords', JSON.stringify(data));
    });
  }, []);
  const nextWordIndex =
    currentWordIndex + 1 >= words.length ? 0 : currentWordIndex + 1;
  const lastWordIndex =
    currentWordIndex - 1 < 0 ? words.length - 1 : currentWordIndex - 1;
  return (
    <Wrapper>
      {words.map((word, index) => {
        let cardStyle = '';
        if (index === currentWordIndex) {
          cardStyle = 'current';
        }
        if (index === nextWordIndex) {
          cardStyle = 'next';
        }
        if (index === lastWordIndex) {
          cardStyle = 'last';
        }
        return (
          <EnglishWord
            key={word.id}
            word={word}
            playAudio={playAudio}
            cardStyle={cardStyle}
          />
        );
      })}
      <IconWrapper
        onClick={() => {
          setCurrentWordIndex(nextWordIndex);
        }}
      >
        <DoubleArrow />
      </IconWrapper>
    </Wrapper>
  );
}

export default EnglishCard;
