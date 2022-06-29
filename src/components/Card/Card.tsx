import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.littleTransparentBlack};
  width: 100%;
  height: 100%;
  padding: 5px;
  color: ${({ theme }) => theme.color.white};
  border-radius: 5px;
  z-index: 0;
  display: flex;
  flex-direction: column;
`;

interface CardProps {
  children: JSX.Element | JSX.Element[] | string;
}

function Card({ children }: CardProps) {
  return <Wrapper>{children}</Wrapper>;
}

export default Card;
