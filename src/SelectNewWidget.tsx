import React from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { defaultConfig } from './components/Widget';
import type { NewWidget, WidgetType } from './components/WidgetContainer/types';

const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.transparentBlack};
  color: white;
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const WidgetOption = styled.div`
  background: ${({ theme }) => theme.lightGrey};
  padding: 20px;
  font-size: 3rem;
  cursor: pointer;
`;

interface SelectNewWidgetProps {
  hideSelectNewWidget: () => void;
  addWidget: (newWidget: NewWidget) => void;
}

function SelectNewWidget({
  hideSelectNewWidget,
  addWidget,
}: SelectNewWidgetProps) {
  const handleAddWidget = (widgetType: WidgetType) => {
    addWidget({ type: widgetType, ...defaultConfig[widgetType] });
  };
  return (
    <Modal>
      <Wrapper onClick={hideSelectNewWidget}>
        {Object.keys(defaultConfig).map((widgetType) => (
          <WidgetOption
            key={widgetType}
            onClick={() => {
              handleAddWidget(widgetType as WidgetType);
            }}
          >
            {widgetType}
          </WidgetOption>
        ))}
      </Wrapper>
    </Modal>
  );
}

export default SelectNewWidget;
