import React from 'react';
import styled from 'styled-components';
// import useLocalStorage from './hooks/useLocalStorage';
import { RoundAddButton, RoundLinkButtonProps } from './components/RoundButton';

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
`;

// type ShortCutItem = {
//   id: string;
//   title: string;
//   url: string;
// };

function ShortCuts() {
  // const [items, setItems] = useLocalStorage<ShortCutItem[]>(
  //   'shortCutItems',
  //   [],
  // );

  return (
    <Wrapper>
      <RoundLinkButtonProps
        url="https://trello.com/b/1C3MlmHo/tabshaker-dragon"
        title="Trello"
      />
      <RoundAddButton onClick={() => {}} />
    </Wrapper>
  );
}

export default ShortCuts;
