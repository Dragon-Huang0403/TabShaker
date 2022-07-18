import React, { useState } from 'react';
import { v4 } from 'uuid';
import styled from 'styled-components';
import Modal from '../Modal';
import useLocalStorage from '../hooks/useLocalStorage';
import { RoundAddButton } from '../components/RoundButton';
import AddNewShortCut from './AddNewShortCut';
import ShortCutItem, { ShortCutItemType } from './ShortCutItem';
import { defaultShortCuts } from '../defaultValue';

const Wrapper = styled.div`
  padding-right: 20px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  gap: 14px;
  height: 100%;
  padding-bottom: 4px;
  overflow-x: auto;
  overflow-y: hidden;
  user-select: none;
`;

function ShortCuts() {
  const [showAddNewShortCut, setShowAddNewShortCut] = useState(false);
  const [items, setItems] = useLocalStorage<ShortCutItemType[]>(
    'shortCutItems',
    [...defaultShortCuts],
  );

  const addNewItem = (title: string, url: string) => {
    setItems([...items, { title, url, id: v4() }]);
  };

  const deleteItem = (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    setItems(newItems);
  };

  return (
    <Wrapper>
      {items.map((item) => (
        <ShortCutItem
          key={item.id}
          item={item}
          deleteItem={() => {
            deleteItem(item.id);
          }}
        />
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
