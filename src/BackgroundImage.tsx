import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import unsplashApi from './utils/unsplashApi';

const BackgroundImg = styled.div<{ url: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  ${({ url }) =>
    url &&
    css`
      background-image: url(${url});
      background-size: cover;
      background-position: 50% 50%;
      opacity: 0.8;
    `}
`;

interface Photo {
  id: string;
  imageUrl: string;
}

function BackgroundImage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  useEffect(() => {
    const rawData = window.localStorage.getItem('backgroundImages');
    const currentTime = new Date();
    if (rawData) {
      const data = JSON.parse(rawData);
      const lastPhotoUpdateTime = Number(data.updateTime);
      if (currentTime.getTime() - lastPhotoUpdateTime < 3600000) {
        const oldPhotos = data.photos;
        setPhotos(oldPhotos);
        return;
      }
    }
    unsplashApi().then((newPhotos) => {
      setPhotos(newPhotos);
      window.localStorage.setItem(
        'backgroundImages',
        JSON.stringify({
          photos: newPhotos,
          updateTime: currentTime.getTime(),
        }),
      );
    });
  }, []);
  return <BackgroundImg url={photos[0]?.imageUrl || ''} />;
}

export default BackgroundImage;
