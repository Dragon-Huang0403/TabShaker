import React, { useState } from 'react';
import { v4 } from 'uuid';
import styled from 'styled-components';
import Modal from '../Modal';
import useLocalStorage from '../hooks/useLocalStorage';
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

type ShortCutItem = {
  id: string;
  title: string;
  url: string;
};

function ShortCuts() {
  const [showAddNewShortCut, setShowAddNewShortCut] = useState(false);
  const [items, setItems] = useLocalStorage<ShortCutItem[]>(
    'shortCutItems',
    [],
  );

  const addNewItem = (title: string, url: string) => {
    setItems([...items, { title, url, id: v4() }]);
  };

  return (
    <Wrapper>
      {items.map((item) => (
        <RoundLinkButtonProps key={item.id} url={item.url} title={item.title} />
      ))}

      <RoundAddButton
        onClick={() => {
          setShowAddNewShortCut(true);
        }}
      />
      {showAddNewShortCut && (
        <Modal>
          <AddNewShortCut
            close={() => {
              setShowAddNewShortCut(false);
            }}
            addNewItem={addNewItem}
          />
        </Modal>
      )}
    </Wrapper>
  );
}

export default ShortCuts;
