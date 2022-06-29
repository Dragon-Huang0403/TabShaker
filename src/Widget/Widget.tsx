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

  return (
    <Wrapper ref={hoverRef}>
      {isHover && (
        <IconDropDownMenu
          items={[{ text: 'Delete', onClick: deleteWidget }]}
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
