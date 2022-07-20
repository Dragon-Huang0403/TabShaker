import React, { useRef } from 'react';
import styled from 'styled-components';

import { Close } from '../../../components/Icons';
import { RoundLinkButton } from '../../../components/RoundButton';
import { useHover, useDebounce } from '../../../hooks';

const ItemWrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div<{ visible: boolean }>`
  z-index: 2;
  position: absolute;
  top: -6px;
  right: -6px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 50%;
  background: ${({ theme }) => theme.color.transparentWhite};
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};

  svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.color.transparentBlack};
  }

  :hover {
    background: ${({ theme }) => theme.color.transparentBlack};
    svg {
      fill: ${({ theme }) => theme.color.lightWhite};
    }
  }
`;

export type ShortCutItemType = {
  id: string;
  title: string;
  url: string;
};

interface ShortCutItemProps {
  item: ShortCutItemType;
  deleteItem: () => void;
}

function ShortCutItem({ item, deleteItem }: ShortCutItemProps) {
  const itemWrapperRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(itemWrapperRef);
  const showIcon = useDebounce(isHover, 1000);
  return (
    <ItemWrapper ref={itemWrapperRef}>
      <IconWrapper
        onClick={() => {
          deleteItem();
        }}
        visible={isHover && showIcon}
      >
        <Close />
      </IconWrapper>
      <RoundLinkButton url={item.url} title={item.title} />
    </ItemWrapper>
  );
}

export default ShortCutItem;
