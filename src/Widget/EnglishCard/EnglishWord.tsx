/* eslint-disable jsx-a11y/media-has-caption */
import React, { useRef, useState } from 'react';
import styled from 'styled-components';

import Content from './Content';
import { Speaker } from '../../components/Icons';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.littleTransparentBlack};
  color: ${({ theme }) => theme.color.lavenderBlue};
  border-radius: 10px;
  padding: 15px 20px 5px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-size: 1rem;
  z-index: -1;
  transform-origin: 0 0;
`;

const Header = styled.div`
  display: flex;
  overflow-x: hidden;
  align-items: flex-end;
`;
const Word = styled.div`
  display: inline-block;
  margin-right: 10px;
  margin-top: 0px;
  color: ${({ theme }) => theme.color.purple};
  font-size: 1.5rem;

  & > a:hover {
    text-decoration: underline;
  }
`;

const Tag = styled.div`
  font-size: 0.75rem;
  display: inline-block;
  margin-left: 10px;
  background: ${({ theme }) => theme.color.grey};
  color: ${({ theme }) => theme.color.white};
  padding: 3px 10px;
  border-radius: 10px;
`;
const Pronunciation = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  & > svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.color.lavenderBlue};
    cursor: pointer;
    border-radius: 50%;
  }
  & > svg:hover {
    fill: ${({ theme }) => theme.color.white};
    background: ${({ theme }) => theme.color.transparentWhite};
  }
`;

const ContentWrapper = styled.div`
  flex-grow: 1;
  position: relative;
  margin-top: 10px;
  overflow-x: hidden;
  width: 100%;
  overflow-x: hidden;
`;

export type EnglishWordData = {
  id: string;
  word: string;
  ipa: string;
  type: string;
  chinese: string;
  definition: string;
  example: string;
  example_chinese: string;
  tags: string[];
  audioUrl: string;
};

interface WordProps {
  word: EnglishWordData;
  tags: string[];
}

function EnglishWord({ word, tags }: WordProps) {
  const [isShowExample, setIsShowExample] = useState(false);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const toggleIsShowExample = () => {
    setIsShowExample((prev) => !prev);
  };

  const showTags =
    tags.length === 0
      ? word.tags
      : word.tags.filter((tag) => tags.includes(tag));
  return (
    <Wrapper>
      <Header>
        <Word>
          <a
            href={`https://dictionary.cambridge.org/zht/%E8%A9%9E%E5%85%B8/%E8%8B%B1%E8%AA%9E-%E6%BC%A2%E8%AA%9E-%E7%B0%A1%E9%AB%94/${word.word}`}
          >
            {word.word}
          </a>
        </Word>
        <div>{word.type}</div>
        {showTags.map(
          (tag, index) =>
            index <= 1 && (
              // eslint-disable-next-line react/no-array-index-key
              <Tag key={index}>{tag}</Tag>
            ),
        )}
      </Header>
      <Pronunciation>
        <span>{word.ipa}</span>
        <audio
          ref={audioRef}
          onLoadedData={() => {
            setIsAudioLoaded(true);
          }}
        >
          <source src={word.audioUrl} type="audio/mpeg" />
        </audio>
        {isAudioLoaded && <Speaker onClick={() => audioRef.current?.play()} />}
      </Pronunciation>

      <ContentWrapper>
        <Content
          title="Definition :"
          english={word.definition}
          chinese={word.chinese}
          position={isShowExample ? -100 : 0}
          onClick={toggleIsShowExample}
        />
        <Content
          title="Example :"
          english={word.example}
          chinese={word.example_chinese}
          position={isShowExample ? 0 : 100}
          onClick={toggleIsShowExample}
        />
      </ContentWrapper>
    </Wrapper>
  );
}

export default EnglishWord;
