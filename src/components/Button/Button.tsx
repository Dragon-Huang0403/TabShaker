import React from 'react';
import styled, { css } from 'styled-components';

const Wrapper = styled.div<{ main: boolean; disable: boolean }>`
  cursor: pointer;
  border-radius: 4px;
  padding: 8px 16px;
  color: ${({ theme }) => theme.color.blue};
  background: ${({ theme }) => theme.color.black};
  font-size: 0.875rem;
  font-weight: 600;
  border: 0.5px solid ${({ theme }) => theme.color.transparentWhite};

  :hover {
    background: ${({ theme }) => theme.color.moreTransparentWhite};
  }

  ${({ main }) =>
    main &&
    css`
      color: ${({ theme }) => theme.color.black};
      background: ${({ theme }) => theme.color.blue};
      border-color: transparent;
      :hover {
        opacity: 0.9;
        background: ${({ theme }) => theme.color.blue};
      }
    `}

  ${({ disable }) =>
    disable &&
    css`
      cursor: inherit;
      color: ${({ theme }) => theme.color.lightGrey};
      background: ${({ theme }) => theme.color.grey};
      border-color: transparent;
      :hover {
        opacity: 1;
        background: ${({ theme }) => theme.color.grey};
      }
    `}
`;

const defaultProps = {
  main: false,
  disable: false,
};

type ButtonProps = {
  text: string;
  main?: boolean;
  disable?: boolean;
  onClick: () => void;
} & typeof defaultProps;

function Button({ text, main, onClick, disable }: ButtonProps) {
  return (
    <Wrapper main={main} onClick={onClick} disable={disable}>
      {text}
    </Wrapper>
  );
}

Button.defaultProps = defaultProps;

export default Button;
