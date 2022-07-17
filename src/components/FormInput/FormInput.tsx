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

const Input = styled.input`
  margin-top: 8px;
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.littleTransparentBlack};
  border-radius: 4px;
  border: 0;
  outline: none;
  font-size: 0.875rem;
  padding: 6px 8px;
  width: 100%;
  caret-color: ${({ theme }) => theme.color.blue};
`;

const UnderLine = styled.div<{ focused: boolean }>`
  width: 100%;
  height: 0;
  position: absolute;
  bottom: 0;
  ${({ focused }) =>
    focused &&
    css`
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
    </Wrapper>
  );
}

export default FormInput;
