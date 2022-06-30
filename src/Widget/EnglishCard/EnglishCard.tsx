import React from 'react';
import styled from 'styled-components';
import { Speaker } from '../../components/Icons';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  font-size: 0.8rem;
`;
const Word = styled.div`
  display: inline-block;
  margin-right: 10px;
  margin-top: 0px;
  color: ${({ theme }) => theme.color.purple};
  font-size: 1.5rem;
`;
const Pronunciation = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  gap: 5px;

  & > svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.color.lightWhite};
    cursor: pointer;
    border-radius: 50%;
  }
  & > svg:hover {
    fill: ${({ theme }) => theme.color.white};
    background: ${({ theme }) => theme.color.transparentWhite};
  }
`;
const Definition = styled.div`
  flex-grow: 1;
  margin-top: auto;
  color: ${({ theme }) => theme.color.white};
`;
const Example = styled.div`
  padding-top: 5px;
  margin-top: auto;
`;

function getAudioUrl(word: string) {
  const str = word.toLocaleLowerCase();
  let url = `https://www.oxfordlearnersdictionaries.com/media/english/us_pron/${str.charAt(
    0,
  )}/${str.slice(0, 3)}/`;
  if (str.length >= 5) {
    url += `${str.slice(0, 5)}/${str}__us_1.mp3`;
    return url;
  }
  url += `${str.padEnd(5, '_')}/${str}__us_1.mp3`;
  return url;
}

function EnglishCard() {
  const playAudio = () => {
    const audio = new Audio(getAudioUrl('tonight'));
    audio.play();
  };

  return (
    <Wrapper>
      <div>
        <Word>Tonight</Word>
        <span>adverb</span>
      </div>
      <Pronunciation>
        <span>/əˈbæn.dən/</span>
        <Speaker onClick={playAudio} />
      </Pronunciation>
      <Definition>
        (during) the night of the present day
        <br />
        （在）今晚；（在）今夜
      </Definition>
      <Example>
        Tonight will be my first chance to meet her <br />
        今晚將是我與她見面的第一次機會。
      </Example>
    </Wrapper>
  );
}

export default EnglishCard;
