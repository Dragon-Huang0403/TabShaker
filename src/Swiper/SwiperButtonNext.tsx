import React from 'react';
import { useSwiper } from 'swiper/react';

interface SwiperButtonNextProps {
  children: React.ReactElement;
}

function SwiperButtonNext({ children }: SwiperButtonNextProps) {
  const swiper = useSwiper();
  const next = () => {
    swiper.slideNext();
  };
  return (
    <button type="button" onClick={next}>
      {children}
    </button>
  );
}

export default SwiperButtonNext;
