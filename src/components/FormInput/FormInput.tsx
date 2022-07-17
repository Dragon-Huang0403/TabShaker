import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div`
  margin-top: 14px;
  margin-bottom: 20px;
  position: relative;
`;

const Title = styled.div<{ focused: boolean }>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme, focused }) =>
    focused ? theme.color.blue : theme.color.lightGrey};
`;

const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 8px;
  width: 100%;
  border-radius: 4px;
  overflow: hidden;
  background: ${({ theme }) => theme.color.littleTransparentBlack};
`;

const Input = styled.input`
  color: ${({ theme }) => theme.color.white};
  border: 0;
  outline: none;
  font-size: 0.875rem;
  padding: 6px 8px;
  width: 100%;
  background: transparent;
  caret-color: ${({ theme }) => theme.color.blue};
`;

const UnderLine = styled.div<{ focused: boolean }>`
  width: 1px;
  height: 0;
  position: relative;
  border-bottom: 2px solid transparent;
  transition: width 0.5s;
  ${({ focused }) =>
    focused &&
    css`
      width: 100%;
      border-bottom: 2px solid ${({ theme }) => theme.color.blue};
    `}
`;

interface FormInputProps {
  title: string;
  value: string;
  onChange: (newValue: string) => void;
}

function FormInput({ title, value, onChange }: FormInputProps) {
  const [focused, setFocus] = useState(false);
  return (
    <Wrapper>
      <Title focused={focused}>{title}</Title>
      <InputContainer>
        <Input
          onChange={(e) => {
            onChange(e.target.value);
          }}
          value={value}
          onFocus={() => {
            setFocus(true);
          }}
          onBlur={() => {
            setFocus(false);
          }}
        />
        <UnderLine focused={focused} />
      </InputContainer>
    </Wrapper>
  );
}

export default FormInput;
