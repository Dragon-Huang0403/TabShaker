import React, { useState } from 'react';
import styled from 'styled-components';
import FormInput from '../components/FormInput';

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

const Container = styled.div`
  border-radius: 8px;
  width: 512px;
  height: 265px;
  padding: 20px;
  background: ${({ theme }) => theme.color.black};
`;

const Title = styled.div`
  color: ${({ theme }) => theme.color.white};
  font-size: 1.25rem;
`;

function AddNewShortCut() {
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');

  return (
    <Wrapper>
      <Container>
        <Title>Add Short Cut</Title>
        <FormInput title="Name" value={name} onChange={setName} />
        <FormInput title="URL" value={url} onChange={setUrl} />
      </Container>
    </Wrapper>
  );
}

export default AddNewShortCut;
