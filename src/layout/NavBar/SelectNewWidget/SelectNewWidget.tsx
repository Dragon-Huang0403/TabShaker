import React, { useRef } from 'react';
import styled from 'styled-components';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import { v4 } from 'uuid';

import WidgetSlide from './WidgetSlide';
import { widgetConfig } from '../../../Widget';
import { DoubleArrow } from '../../../components/Icons';
import { SwiperButtonNext, SwiperButtonPrev } from '../../../components/Swiper';

import type { WidgetData, WidgetType } from '../../../types/WidgetTypes';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const Wrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.color.transparentBlack};
  z-index: 10;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  padding: 0 5vw;
`;

const IconWrapper = styled.div<{ direction: 'left' | 'right' }>`
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  top: 0px;
  z-index: 10;
  ${({ direction }) => direction}: 0;
  & button {
    padding: 0;
    width: 60px;
    height: 60px;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  & svg {
    width: 100%;
    height: 100%;
    fill ${({ theme }) => theme.color.lightBlue};
  }
`;

interface SelectNewWidgetProps {
  hideSelectNewWidget: () => void;
  addWidget: (newWidget: WidgetData) => void;
  availableWidgets: WidgetType[];
}

function SelectNewWidget({
  hideSelectNewWidget,
  addWidget,
  availableWidgets,
}: SelectNewWidgetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleAddWidget = (widgetType: WidgetType) => {
    addWidget({ type: widgetType, ...widgetConfig[widgetType], id: v4() });
    hideSelectNewWidget();
  };
  const handleHideSelectNewWidget = (e: React.MouseEvent) => {
    if (e.target === wrapperRef.current) {
      hideSelectNewWidget();
    }
  };
  return (
    <Wrapper ref={wrapperRef} onClick={handleHideSelectNewWidget}>
      <Swiper
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView={3}
        loop
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow]}
        className="selectNewWidget"
      >
        <IconWrapper direction="left">
          <SwiperButtonPrev>
            <DoubleArrow direction="left" />
          </SwiperButtonPrev>
        </IconWrapper>
        {availableWidgets.map((widgetType) => (
          <SwiperSlide key={widgetType}>
            <WidgetSlide
              widgetType={widgetType}
              addWidget={() => {
                handleAddWidget(widgetType as WidgetType);
              }}
            />
          </SwiperSlide>
        ))}
        <IconWrapper direction="right">
          <SwiperButtonNext>
            <DoubleArrow direction="right" />
          </SwiperButtonNext>
        </IconWrapper>
      </Swiper>
    </Wrapper>
  );
}

export default SelectNewWidget;
