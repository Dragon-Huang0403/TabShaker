import React, { useRef } from 'react';
import styled from 'styled-components';
import type { WidgetData } from '../types/WidgetTypes';
import { useHover } from '../hooks';
import IconDropDownMenu from '../components/IconDropDownMenu';
import { MoreDots } from '../components/Icons';
import renderWidget from './renderWidget';

const Wrapper = styled.div`
  position: absolute;
  padding: 5px;
  width: 100%;
  height: 100%;
`;
interface WidgetProps {
  widget: WidgetData;
  deleteWidget: () => void;
  onWidgetChange: (newWidget: WidgetData) => void;
}

function Widget({ widget, deleteWidget, onWidgetChange }: WidgetProps) {
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(hoverRef);
  const handleOnWidgetChange = (data: any) => {
    onWidgetChange({ ...widget, data });
  };
  const menu = widget.menu.map((item) => ({
    text: item,
    checked: widget.data.tag.includes(item),
    onClick: () => {
      const newWidget = { ...widget };
      newWidget.data = { ...newWidget.data };
      if (!newWidget.data.tag) return;
      if (newWidget.data.tag.includes(item)) {
        newWidget.data.tag = newWidget.data.tag.filter(
          (tag: string) => tag !== item,
        );
      } else {
        newWidget.data.tag = [...newWidget.data.tag, item];
      }
      onWidgetChange(newWidget);
    },
  }));
  return (
    <Wrapper ref={hoverRef}>
      {isHover && (
        <IconDropDownMenu
          items={[{ text: 'Delete', onClick: deleteWidget }, ...menu]}
          style={{ top: '12px', right: '12px', position: 'absolute' }}
        >
          <MoreDots />
        </IconDropDownMenu>
      )}
      {renderWidget(widget, handleOnWidgetChange)}
    </Wrapper>
  );
}

export default Widget;
