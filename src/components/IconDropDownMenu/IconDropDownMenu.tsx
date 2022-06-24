import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import IconHoverContainer from '../IconHoverContainer';

const Wrapper = styled.div`
  z-index: 10;
`;

const ItemsContainer = styled.ul<{ side: 'left' | 'right' }>`
  position: absolute;
  padding: 5px 0px;
  overflow: hidden;
  list-style: none;
  margin: 0;
  top: 110%;
  ${({ side }) => side}: 0;
  background: ${({ theme }) => theme.grey};
  color: ${({ theme }) => theme.white};
  min-width: 100px;
  cursor: pointer;
  font-size: 0.75rem;

  & > li {
    padding: 5px;
  }

  & > li:hover {
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
  // eslint-disable-next-line react/require-default-props
  style?: React.CSSProperties;
  // eslint-disable-next-line react/require-default-props
  side?: 'left' | 'right';
};

function IconDropDownMenu({
  children,
  items,
  style = {},
  side = 'right',
}: IconDropDownMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const closeMenu = () => {
      // const target = e.target as HTMLUListElement;
      // const { parentNode } = target;
      // if (
      //   target === menuRef.current ||
      //   parentNode === menuRef.current ||
      //   parentNode?.parentNode === menuRef.current
      // )
      //   return;
      setIsMenuOpen(false);
      // e.preventDefault();
    };

    window.addEventListener('click', closeMenu, true);
    return () => {
      window.removeEventListener('click', closeMenu, true);
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
        <ItemsContainer ref={menuRef} side={side}>
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
export default IconDropDownMenu;
