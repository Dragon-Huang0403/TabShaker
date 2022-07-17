import React, { useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import FormInput from '../components/FormInput';
import Button from '../components/Button/Button';
import { getValidateURL } from '../utils/lib';

const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.color.transparentBlack};
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  padding: 0 5vw;
`;

const Container = styled.div<{ isBlur: boolean }>`
  border-radius: 8px;
  width: 512px;
  height: 265px;
  padding: 20px;
  background: ${({ theme }) => theme.color.black};

  ${({ isBlur }) =>
    isBlur &&
    css`
      transform: scale(1.02);
    `}
`;

const Title = styled.div`
  color: ${({ theme }) => theme.color.white};
  font-size: 1.25rem;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
`;

interface AddNewShortCutProps {
  close: () => void;
  addNewItem: (title: string, url: string) => void;
}

function AddNewShortCut({ close, addNewItem }: AddNewShortCutProps) {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [isBlur, setIsBlur] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const onMouseDown = (e: React.MouseEvent) => {
    if (e.target === wrapperRef.current) {
      e.preventDefault();
      e.stopPropagation();
      setIsBlur(true);
    }
  };
  const onMouseUp = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBlur(false);
  };

  const handleAddNewItem = () => {
    if (!url) return;
    const validatedUrl = getValidateURL(url);
    addNewItem(name, validatedUrl);
    close();
  };

  return (
    <Wrapper ref={wrapperRef} onMouseDown={onMouseDown} onMouseUp={onMouseUp}>
      <Container isBlur={isBlur}>
        <Title>Add Short Cut</Title>
        <form action="" onSubmit={handleAddNewItem}>
          <FormInput title="Name" value={name} onChange={setName} />
          <FormInput title="URL" value={url} onChange={setUrl} required />
          <ButtonContainer>
            <Button onClick={close} text="Cancel" />
            <Button
              onClick={handleAddNewItem}
              text="Done"
              main
              disable={!url}
            />
          </ButtonContainer>
          <input type="submit" hidden />
        </form>
      </Container>
    </Wrapper>
  );
}

export default AddNewShortCut;
