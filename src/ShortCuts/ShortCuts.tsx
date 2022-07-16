import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from '../Modal';
// import useLocalStorage from './hooks/useLocalStorage';
import {
  RoundAddButton,
  RoundLinkButtonProps,
} from '../components/RoundButton';
import AddNewShortCut from './AddNewShortCut';

const Wrapper = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

// type ShortCutItem = {
//   id: string;
//   title: string;
//   url: string;
// };

function ShortCuts() {
  const [showAddNewShortCut, setShowAddNewShortCut] = useState(false);
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
      <RoundAddButton
        onClick={() => {
          setShowAddNewShortCut(true);
        }}
      />
      {showAddNewShortCut && (
        <Modal>
          <AddNewShortCut />
        </Modal>
      )}
    </Wrapper>
  );
}

export default ShortCuts;
