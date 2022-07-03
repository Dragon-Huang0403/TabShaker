import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper';
import styled from 'styled-components';
import { v4 } from 'uuid';
import { DoubleArrow } from './components/Icons';
import Modal from './Modal';
import { defaultConfig } from './Widget';
import { SwiperButtonNext, SwiperButtonPrev } from './Swiper';
import type { WidgetData, WidgetType } from './types/WidgetTypes';
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
  padding: 0px 5vw;
  user-select: none;
`;

const WidgetOption = styled.div`
  background: ${({ theme }) => theme.color.lightGrey};
  padding: 20px;
  font-size: 3rem;
  cursor: pointer;
`;
const IconWrapper = styled.div<{ direction: 'left' | 'right' }>`
  position: absolute;
  display: flex;
  align-items: center;
  height: 100%;
  top: 0px;
  z-index: 10;
  ${({ direction }) => direction}: -1vw;
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
}

function SelectNewWidget({
  hideSelectNewWidget,
  addWidget,
}: SelectNewWidgetProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const handleAddWidget = (widgetType: WidgetType) => {
    addWidget({ type: widgetType, ...defaultConfig[widgetType], id: v4() });
    hideSelectNewWidget();
  };
  const handleHideSelectNewWidget = (e: React.MouseEvent) => {
    if (e.target === wrapperRef.current) {
      hideSelectNewWidget();
    }
  };
  return (
    <Modal>
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
          {Object.keys(defaultConfig).map((widgetType) => (
            <SwiperSlide key={widgetType}>
              <WidgetOption
                onClick={() => {
                  handleAddWidget(widgetType as WidgetType);
                }}
              >
                {widgetType}
              </WidgetOption>
            </SwiperSlide>
          ))}
          <IconWrapper direction="right">
            <SwiperButtonNext>
              <DoubleArrow direction="right" />
            </SwiperButtonNext>
          </IconWrapper>
        </Swiper>
      </Wrapper>
    </Modal>
  );
}

export default SelectNewWidget;
