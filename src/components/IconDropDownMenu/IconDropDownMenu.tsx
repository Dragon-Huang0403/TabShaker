import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import IconHoverContainer from '../IconHoverContainer';
import { Check } from '../Icons';

const Wrapper = styled.div`
  z-index: 10;
`;

const ItemsContainer = styled.ul<{ side: 'left' | 'right'; bulge: boolean }>`
  position: absolute;
  padding: 5px 0px;
  list-style: none;
  margin: 0;
  top: 110%;
  ${({ side }) => side}: 0;
  background: ${({ theme }) => theme.color.grey};
  color: ${({ theme }) => theme.color.white};
  min-width: 100px;
  font-size: 0.75rem;
  ${({ bulge }) =>
    bulge &&
    css`
      &::before {
        content: '';
        position: absolute;
        left: 10px;
        top: -6px;
        border-bottom: 6px solid ${({ theme }) => theme.color.grey};
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
      }
    `}
`;

const Item = styled.li`
  padding: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &:hover {
    background: ${({ theme }) => theme.color.transparentWhite};
  }

  & > svg {
    width: 1rem;
    height: 1rem;
    margin-right: 3px;
    fill: ${({ theme }) => theme.color.white};
  }

  & > span {
    flex-basis: 80%;
  }
`;

interface ItemData {
  text: string;
  onClick: () => void;
  checked?: boolean;
}

type IconDropDownMenuProps = {
  children: JSX.Element;
  items: ItemData[];
  style?: React.CSSProperties;
  side?: 'left' | 'right';
  bulge?: boolean;
} & typeof defaultProps;

const defaultProps = {
  style: {},
  side: 'right',
  bulge: false,
};

function IconDropDownMenu({
  children,
  items,
  style,
  side,
  bulge,
}: IconDropDownMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const closeMenu = (e: MouseEvent) => {
      setIsMenuOpen(false);
      e.preventDefault();
    };

    window.addEventListener('click', closeMenu);
    return () => {
      window.removeEventListener('click', closeMenu);
    };
  }, [isMenuOpen]);

  return (
    <Wrapper style={style}>
      <IconHoverContainer
        onClick={(e) => {
          if (!isMenuOpen) {
            setIsMenuOpen(true);
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        {children}
      </IconHoverContainer>
      {isMenuOpen && (
        <ItemsContainer side={side} bulge={bulge}>
          {items.map((item, index) => (
            <Item
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={item.onClick}
              role="presentation"
            >
              {item.checked && <Check />}
              <span>{item.text}</span>
            </Item>
          ))}
        </ItemsContainer>
      )}
    </Wrapper>
  );
}

IconDropDownMenu.defaultProps = defaultProps;

export default IconDropDownMenu;
