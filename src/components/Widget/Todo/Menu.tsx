import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { ExpandMore } from '../../Icons';

const Wrapper = styled.div`
  padding: 10px 15px 20px;
  width: 100%;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const Title = styled.div``;

const IconWrapper = styled.div`
  margin-left: 7px;
  margin-top: 5px;
  padding: 3px;
  width: 30px;
  height: 30px;
  border-radius: 50%;

  &:hover {
    background: ${({ theme }) => theme.blackHoverBackgroundColor};
  }

  & > svg {
    width: 24px;
    height: 24px;
    fill: ${({ theme }) => theme.white};
  }
`;

const MenuWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100px;
  margin-top: 60px;
`;

function Menu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const closeMenu = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      const { parentNode } = target;
      if (
        target === menuRef.current ||
        parentNode === menuRef.current ||
        parentNode?.parentNode === menuRef.current
      )
        return;
      setIsMenuOpen(false);
      e.preventDefault();
      e.stopPropagation();
    };

    window.addEventListener('click', closeMenu, true);
    return () => {
      window.removeEventListener('click', closeMenu, true);
    };
  }, [isMenuOpen]);
  return (
    <Wrapper ref={menuRef}>
      <Title>Inbox</Title>
      <IconWrapper
        onClick={(e) => {
          if (!isMenuOpen) {
            setIsMenuOpen(true);
            e.preventDefault();
            e.stopPropagation();
          }
        }}
      >
        <ExpandMore />
      </IconWrapper>
      {isMenuOpen && <MenuWrapper>Hi~</MenuWrapper>}
    </Wrapper>
  );
}

export default Menu;
