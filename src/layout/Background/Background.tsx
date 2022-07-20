/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled from 'styled-components';

import BackgroundImage from './BackgroundImage';
import Controller from './Controller';
import unsplashApi, { UnsplashResponseData } from './unsplashApi';
import { getNextPhoto, getPrevPhoto } from './lib';
import { useInterval, useLocalStorage } from '../../hooks';
import { afterOneHour } from '../../utils/lib';
import defaultPhoto from './photos';

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

type PhotoData = {
  photos: UnsplashResponseData[];
  updatedAt: string;
};

function Background() {
  const [photoData, setPhotoData] = useLocalStorage<PhotoData>('bgImgData', {
    photos: [],
    updatedAt: String(new Date()),
  });
  const [bgImgSettings, setBgImgSettings] = useLocalStorage('bgImgSettings', {
    isPlay: false,
    currentPhoto: 0,
    timeToNextPhoto: 30000,
  });
  const { photos, updatedAt } = photoData;
  const { isPlay, currentPhoto, timeToNextPhoto } = bgImgSettings;

  const nextPhoto = getNextPhoto(currentPhoto, photos.length - 1);
  const prevPhoto = getPrevPhoto(currentPhoto, photos.length - 1);

  const setCurrentPhoto = (photoIndex: number) => {
    setBgImgSettings({ ...bgImgSettings, currentPhoto: photoIndex });
  };

  const setIsPlay = (newIsPlay: boolean) => {
    setBgImgSettings({ ...bgImgSettings, isPlay: newIsPlay });
  };

  useInterval(
    () => {
      setCurrentPhoto(nextPhoto);
    },
    isPlay ? timeToNextPhoto : null,
  );

  useEffect(() => {
    if (photos.length > 0 && !afterOneHour(updatedAt)) {
      return;
    }
    const getNewPhotos = async () => {
      const response = await unsplashApi();
      if (!response.error && response.data) {
        const oldPhoto =
          photos.length >= 1 ? photos[photos.length - 1] : defaultPhoto[0];
        const newPhotos = [oldPhoto, ...response.data];
        setPhotoData({
          photos: newPhotos,
          updatedAt: String(new Date()),
        });
        return;
      }
      setPhotoData({ photos: defaultPhoto, updatedAt: String(new Date()) });
    };
    getNewPhotos();
  }, [updatedAt, photos.length]);
  return (
    <Wrapper>
      {photos.map((photo, index) => (
        <BackgroundImage
          key={photo.id}
          photo={photo}
          currentPhoto={index === currentPhoto}
        />
      ))}
      <Controller
        isPlay={isPlay}
        nextPhoto={nextPhoto}
        prevPhoto={prevPhoto}
        setIsPlay={setIsPlay}
        setCurrentPhoto={setCurrentPhoto}
      />
    </Wrapper>
  );
}

export default Background;
