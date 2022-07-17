import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { DropDownMenu } from '../components/IconDropDownMenu';
import { MoreDots } from '../components/Icons';
import { RoundLinkButtonProps } from '../components/RoundButton';
import { useHover } from '../hooks';
import useClickAnyWhere from '../hooks/useClickAnyWhere';
import useDebounce from '../hooks/useDebounce';

const ItemWrapper = styled.div`
  position: relative;
`;

const IconWrapper = styled.div<{ visible: boolean }>`
  z-index: 2;
  position: absolute;
  top: -12px;
  right: -12px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  border-radius: 50%;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};

  svg {
    width: 20px;
    height: 20px;
    fill: ${({ theme }) => theme.color.littleTransparentBlack};
  }

  :hover {
    background: ${({ theme }) => theme.color.transparentBlack};
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
  const [isDropDownShow, setIsDropDownShow] = useState(false);
  const itemWrapperRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(itemWrapperRef);
  const showIcon = useDebounce(isHover, 2000);
  useClickAnyWhere(() => {
    setIsDropDownShow(false);
  });
  return (
    <ItemWrapper ref={itemWrapperRef}>
      <IconWrapper
        onClick={(e) => {
          if (!isDropDownShow) {
            setIsDropDownShow(true);
            e.preventDefault();
            e.stopPropagation();
          }
        }}
        visible={isHover && showIcon}
      >
        <MoreDots />
        {isDropDownShow && (
          <DropDownMenu
            items={[
              {
                text: 'Delete',
                onClick: deleteItem,
              },
            ]}
          />
        )}
      </IconWrapper>
      <RoundLinkButtonProps url={item.url} title={item.title} />
    </ItemWrapper>
  );
}

export default ShortCutItem;
