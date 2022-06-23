import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { MoreDots } from '../Icons';

const Wrapper = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 10;
`;

const IconWrapper = styled.div`
  width: 36px;
  height: 36px;
  padding: 6px;

  fill: ${({ theme }) => theme.white};
  border-radius: 50%;

  &:hover {
    background: ${({ theme }) => theme.blackHoverBackgroundColor};
    cursor: pointer;
  }

  & > svg {
    width: 24px;
    height: 24px;
  }
`;

const MenuWrapper = styled.div`
  position: absolute;
  top: 16px;
  left: 0px;
  margin-top: 20px;
  background: ${({ theme }) => theme.black};
  color: ${({ theme }) => theme.white};
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 60%), 0 2px 6px 2px rgb(0 0 0 / 30%);
`;

const Item = styled.div`
  padding: 12px 24px 12px 8px;
  &:hover {
    background: ${({ theme }) => theme.blackHoverBackgroundColor};
  }
`;

interface MenuProps {
  deleteWidget: () => void;
}

function Menu({ deleteWidget }: MenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isMenuOpen) return undefined;
    const closeMenu = (e: MouseEvent) => {
      const target = e.target as HTMLDivElement;
      if (target.parentNode !== menuRef.current) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('click', closeMenu, false);
    return () => {
      window.removeEventListener('click', closeMenu);
    };
  }, [isMenuOpen]);
  return (
    <Wrapper>
      <IconWrapper
        onClickCapture={(e) => {
          e.nativeEvent.preventDefault();
          e.nativeEvent.stopPropagation();
          setIsMenuOpen((prev) => !prev);
        }}
      >
        <MoreDots />
      </IconWrapper>

      {isMenuOpen && (
        <MenuWrapper ref={menuRef}>
          <Item>Edit</Item>
          <Item onClick={deleteWidget}>Delete</Item>
        </MenuWrapper>
      )}
    </Wrapper>
  );
}

export default Menu;
