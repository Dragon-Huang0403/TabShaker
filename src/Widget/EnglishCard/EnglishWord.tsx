import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { Speaker } from '../../components/Icons';
import type { EnglishWordData } from '../../types/WidgetTypes';
import Content from './Content';

const Wrapper = styled.div<{ currentWord: boolean }>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.lavenderBlue};
  border-radius: 10px;
  padding: 15px 20px 5px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-size: 1rem;
  z-index: -1;
  transform-origin: 0 0;

  ${({ currentWord }) =>
    currentWord &&
    css`
      z-index: 1;
    `}
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

interface WordProps {
  word: EnglishWordData;
  currentWord: boolean;
  tags: string[];
  playAudio: (word: string) => void;
}

function EnglishWord({ word, playAudio, currentWord, tags }: WordProps) {
  const [isShowExample, setIsShowExample] = useState(false);
  const toggleIsShowExample = () => {
    setIsShowExample((prev) => !prev);
  };

  const showTags =
    tags.length === 0
      ? word.tags
      : word.tags.filter((tag) => tags.includes(tag));
  return (
    <Wrapper currentWord={currentWord}>
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
        <Speaker onClick={() => playAudio(word.word)} />
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
