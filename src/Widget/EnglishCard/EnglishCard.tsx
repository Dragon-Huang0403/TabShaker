import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getCard } from '../../utils/firebase';
import { getAudioUrl, convertEnglishWordTag } from '../../utils/lib';
import type { EnglishWordData } from '../../types/WidgetTypes';
import EnglishWord from './EnglishWord';
import { DoubleArrow, Refresh } from '../../components/Icons';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;

const IconsContainer = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 5;
  display: flex;
  gap: 5px;
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
    fill: ${({ theme }) => theme.color.lightWhite};
  }

  & > svg {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.color.transparentWhite};
  }
`;

interface EnglishCardProps {
  data: {
    tag: string[];
  };
}

function EnglishCard({ data }: EnglishCardProps) {
  const [words, setWords] = useState<EnglishWordData[]>([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const tag = convertEnglishWordTag(data.tag);

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
      <IconsContainer>
        <IconWrapper onClick={updateWords}>
          <Refresh />
        </IconWrapper>
        <IconWrapper
          onClick={() => {
            setCurrentWordIndex(nextWordIndex);
          }}
        >
          <DoubleArrow />
        </IconWrapper>
      </IconsContainer>
    </Wrapper>
  );
}

export default EnglishCard;
