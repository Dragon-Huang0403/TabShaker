import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.white};
  border: none;
  outline: none;
  line-height: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 2px;
  padding: 8px 12px 4px;
`;

interface TitleProps {
  title: string;
  setTitle: (title: string) => void;
  onEnter: () => void;
}

function Title({ title, setTitle, onEnter }: TitleProps) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code !== 'Enter') return;
    e.preventDefault();
    onEnter();
  };
  return (
    <Input
      onKeyDown={onKeyDown}
      value={title}
      placeholder="Title..."
      onChange={(e) => {
        setTitle(e.target.value);
      }}
    />
  );
}

export default Title;
