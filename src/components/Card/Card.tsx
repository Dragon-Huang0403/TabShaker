import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.black};
  width: 100%;
  height: 100%;
  padding: 5px;
  color: ${({ theme }) => theme.white};
  border-radius: 20px;
  z-index: 0;
  display: flex;
  flex-direction: column;
  box-shadow: -2px -2px 3px rgb(255 255 255 / 12%),
    2px 2px 3px rgb(255 255 255 / 12%);
`;

interface CardProps {
  children: JSX.Element[] | string;
}

function Card({ children }: CardProps) {
  return <Wrapper>{children}</Wrapper>;
}

export default Card;
