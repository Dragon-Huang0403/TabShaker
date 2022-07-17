import React from 'react';
import styled from 'styled-components';
import Button from '../components/Button/Button';

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 20px;
  border-radius: 8px;
  width: 400px;
  height: 265px;
  padding: 20px 5px;
  background: ${({ theme }) => theme.color.black};
  box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.white};
`;

const Title = styled.div`
  margin-bottom: 10px;
`;

const Section = styled.div`
  padding: 0px 15px 10px;
`;

function Settings() {
  const restoreSettings = () => {
    window.localStorage.clear();
    chrome?.storage?.sync?.clear();
    window.location.href = '/';
  };
  return (
    <Wrapper>
      <Section>
        <Title>Settings</Title>
        <Button onClick={restoreSettings} main text="Restore settings" />
      </Section>
    </Wrapper>
  );
}

export default Settings;
