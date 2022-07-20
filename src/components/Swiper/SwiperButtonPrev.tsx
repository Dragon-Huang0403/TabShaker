import React from 'react';

import { useSwiper } from 'swiper/react';

interface SwiperButtonPrevProps {
  children: React.ReactElement;
}

function SwiperButtonPrev({ children }: SwiperButtonPrevProps) {
  const swiper = useSwiper();
  const prev = () => {
    swiper.slidePrev();
  };
  return (
    <button type="button" onClick={prev}>
      {children}
    </button>
  );
}

export default SwiperButtonPrev;
