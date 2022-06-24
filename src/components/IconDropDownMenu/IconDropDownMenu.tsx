import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import IconHoverContainer from '../IconHoverContainer';

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
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.white};
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
        border-bottom: 6px solid ${({ theme }) => theme.grey};
        border-left: 6px solid transparent;
        border-right: 6px solid transparent;
      }
    `}

  & > li {
    padding: 5px;
  }

  & > li:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.transparentWhite};
  }
`;

interface Item {
  text: string;
  onClick: () => void;
}

type IconDropDownMenuProps = {
  children: JSX.Element;
  items: Item[];
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
  const menuRef = useRef<HTMLUListElement>(null);
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
        <ItemsContainer ref={menuRef} side={side} bulge={bulge}>
          {items.map((item, index) => (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              onClick={item.onClick}
              role="presentation"
            >
              {item.text}
            </li>
          ))}
        </ItemsContainer>
      )}
    </Wrapper>
  );
}

IconDropDownMenu.defaultProps = defaultProps;

export default IconDropDownMenu;
