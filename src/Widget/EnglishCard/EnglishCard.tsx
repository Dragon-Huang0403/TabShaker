import React, { useEffect, useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { getCard } from '../../utils/firebase';
import { getAudioUrl } from '../../utils/lib';
import type { EnglishWordData } from '../../types/WidgetTypes';
import EnglishWord from './EnglishWord';
import { DoubleArrow, Refresh } from '../../components/Icons';
import { useHover } from '../../hooks';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
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

  &:hover {
    background: ${({ theme }) => theme.color.transparentWhite};
  }
  &:hover > svg {
    fill: ${({ theme }) => theme.color.white};
  }

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

interface EnglishCardProps {
  data: {
    tag: string[];
  };
}

function EnglishCard({ data }: EnglishCardProps) {
  const [words, setWords] = useState<EnglishWordData[]>([]);
  const hoverRef = useRef<HTMLDivElement>(null);
  const isIConHover = useHover(hoverRef);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const { tag } = data;

  const playAudio = async (word: string) => {
    const audio = new Audio(getAudioUrl(word));
    audio.play();
  };

  const updateWords = () => {
    getCard(10, tag).then((res) => {
      setWords(res as EnglishWordData[]);
      window.localStorage.setItem('engWords', JSON.stringify(res));
      const currentTime = new Date().getTime();
      window.localStorage.setItem('wordsUpdatedAt', String(currentTime));
    });
  };

  useEffect(() => {
    const oldWords = window.localStorage.getItem('engWords');
    if (oldWords) {
      const wordsUpdatedAt = localStorage.getItem('wordsUpdatedAt');
      const currentTime = new Date().getTime();
      if (!wordsUpdatedAt || currentTime - Number(wordsUpdatedAt) <= 86400000) {
        setWords(JSON.parse(oldWords));
        return;
      }
    }
    updateWords();
  }, []);

  const nextWordIndex =
    currentWordIndex + 1 >= words.length ? 0 : currentWordIndex + 1;
  const lastWordIndex =
    currentWordIndex - 1 < 0 ? words.length - 1 : currentWordIndex - 1;

  return (
    <Wrapper>
      {words.map((word, index) => (
        <EnglishWord
          key={word.id}
          word={word}
          playAudio={playAudio}
          currentWord={currentWordIndex === index}
          tags={tag}
        />
      ))}
      <IconsContainer ref={hoverRef} isIConHover={isIConHover}>
        <IconWrapper
          onClick={() => {
            setCurrentWordIndex(lastWordIndex);
          }}
        >
          <DoubleArrow direction="left" />
        </IconWrapper>
        <IconWrapper onClick={updateWords}>
          <Refresh />
        </IconWrapper>
        <IconWrapper
          onClick={() => {
            setCurrentWordIndex(nextWordIndex);
          }}
        >
          <DoubleArrow direction="right" />
        </IconWrapper>
      </IconsContainer>
    </Wrapper>
  );
}

export default EnglishCard;
