import React, { useRef } from 'react';
import styled from 'styled-components';
import type { WidgetData } from '../types/WidgetTypes';
import { useHover } from '../hooks';
import IconDropDownMenu from '../components/IconDropDownMenu';
import { MoreDots } from '../components/Icons';
import renderWidget, { handleWidgetTagUpdate } from './renderWidget';

const Wrapper = styled.div`
  position: absolute;
  padding: 5px;
  width: 100%;
  height: 100%;
`;

const defaultProps = {
  width: -1,
  height: -1,
};
type WidgetProps = {
  widget: WidgetData;
  deleteWidget: () => void;
  onWidgetChange: (newWidget: WidgetData) => void;
  width?: number;
  height?: number;
} & typeof defaultProps;

function Widget({
  widget,
  deleteWidget,
  onWidgetChange,
  width,
  height,
}: WidgetProps) {
  const hoverRef = useRef<HTMLDivElement>(null);
  const isHover = useHover(hoverRef);
  const handleOnWidgetChange = (data: any) => {
    onWidgetChange({ ...widget, data });
  };
  const menu = widget.menu.map((item) => ({
    text: item,
    checked: widget.data.tag.includes(item),
    onClick: () => {
      const newWidget = handleWidgetTagUpdate(item, widget);
      onWidgetChange(newWidget);
    },
  }));
  return (
    <Wrapper ref={hoverRef}>
      <IconDropDownMenu
        items={[{ text: 'Delete', onClick: deleteWidget }, ...menu]}
        style={{
          top: '12px',
          right: '12px',
          position: 'absolute',
          visibility: isHover ? 'visible' : 'hidden',
        }}
      >
        <MoreDots />
      </IconDropDownMenu>
      {renderWidget(widget, handleOnWidgetChange, width, height)}
    </Wrapper>
  );
}

Widget.defaultProps = defaultProps;

export default Widget;
