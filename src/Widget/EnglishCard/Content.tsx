import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div<{ position: number }>`
  position: absolute;
  width: 100%;
  color: ${({ theme }) => theme.color.lightPurple};
  transform: translateX(${({ position }) => position}%);
  transition: transform 0.3s;
  cursor: pointer;
`;
const Title = styled.div`
  font-weight: 600;
`;
const English = styled.div`
  margin-left: 10px;
`;
const Chinese = styled.div`
  margin-left: 10px;
`;

interface ContentProps {
  title: string;
  english: string;
  chinese: string;
  position: number;
  onClick: () => void;
}

function Content({ title, english, chinese, position, onClick }: ContentProps) {
  return (
    <Wrapper position={position} onClick={onClick}>
      <Title>{title}</Title>
      <English>{english}</English>
      <Chinese>{chinese}</Chinese>
    </Wrapper>
  );
}

export default Content;
