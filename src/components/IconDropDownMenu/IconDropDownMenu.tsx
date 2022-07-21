import React, { useState } from 'react';
import styled from 'styled-components';

import DropDownMenu, { ItemData } from './DropDownMenu';
import IconHoverContainer from '../IconHoverContainer';
import useClickAnyWhere from '../../hooks/useClickAnyWhere';

const Wrapper = styled.div`
  z-index: 10;
`;

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
  useClickAnyWhere(() => {
    setIsMenuOpen(false);
  });

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
      {isMenuOpen && <DropDownMenu items={items} side={side} bulge={bulge} />}
    </Wrapper>
  );
}

IconDropDownMenu.defaultProps = defaultProps;

export default IconDropDownMenu;
