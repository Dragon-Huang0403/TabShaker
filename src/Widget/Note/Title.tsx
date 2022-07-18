import React, { useState } from 'react';
import styled from 'styled-components';

const Input = styled.input`
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.color.white};
  border: none;
  outline: none;
  line-height: 1.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  padding: 8px 15px 4px;
  margin-bottom: 5px;
`;

interface TitleProps {
  title: string;
  setTitle: (title: string) => void;
  onEnter: () => void;
}

function Title({ title, setTitle, onEnter }: TitleProps) {
  const [isComposition, setIsComposition] = useState(false);
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter' || isComposition) return;
    e.preventDefault();
    onEnter();
  };
  const handleComposition = (e: React.CompositionEvent) => {
    const { type } = e;
    if (type === 'compositionstart') {
      setIsComposition(true);
      return;
    }
    setIsComposition(false);
  };
  return (
    <Input
      onKeyDown={onKeyDown}
      value={title}
      placeholder="Title..."
      onChange={(e) => {
        setTitle(e.target.value);
      }}
      onCompositionStart={handleComposition}
      onCompositionEnd={handleComposition}
    />
  );
}

export default Title;
