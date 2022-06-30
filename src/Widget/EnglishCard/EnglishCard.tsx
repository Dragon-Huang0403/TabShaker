import React from 'react';
import styled from 'styled-components';

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

function EnglishCard() {
  return (
    <Wrapper>
      <div>
        <Word>Tonight</Word>
        <span>adverb</span>
      </div>
      <Pronunciation>/əˈbæn.dən/</Pronunciation>
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
