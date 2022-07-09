import React from 'react';
import styled from 'styled-components';
import type { WidgetType } from './types/WidgetTypes';
import { widgetDemo } from './Widget/defaultConfig';
import renderWidget from './Widget/renderWidget';

const Wrapper = styled.div`
  height: 50vh;
  padding: 20px;
  cursor: pointer;
`;

interface WidgetSlideProps {
  widgetType: WidgetType;
  addWidget: () => void;
}

function WidgetSlide({ widgetType, addWidget }: WidgetSlideProps) {
  const onClickCapture = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addWidget();
  };
  const widget = widgetDemo[widgetType];
  return (
    <Wrapper onClickCapture={onClickCapture}>{renderWidget(widget)}</Wrapper>
  );
}

export default WidgetSlide;
