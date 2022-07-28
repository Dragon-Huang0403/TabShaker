/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
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
  const [isFirstBackgroundLoading, setIsFirstBackgroundLoading] =
    useState(false);
  const [bgImgSettings, setBgImgSettings] = useLocalStorage('bgImgSettings', {
    isPinned: false,
    isPlay: true,
    currentPhoto: 0,
    timeToNextPhoto: 30000,
  });
  const { photos, updatedAt } = photoData;
  const { isPlay, currentPhoto, timeToNextPhoto, isPinned } = bgImgSettings;

  const nextPhoto = getNextPhoto(currentPhoto, photos.length - 1);
  const prevPhoto = getPrevPhoto(currentPhoto, photos.length - 1);

  const setCurrentPhoto = (photoIndex: number) => {
    setBgImgSettings({ ...bgImgSettings, currentPhoto: photoIndex });
  };

  const toggleIsPlay = () => {
    setBgImgSettings((prev) => ({ ...prev, isPlay: !prev.isPlay }));
  };

  const toggleIsPinned = () => {
    setBgImgSettings((prev) => ({ ...prev, isPinned: !prev.isPinned }));
  };

  useInterval(
    () => {
      setCurrentPhoto(nextPhoto);
    },
    isPlay ? timeToNextPhoto : null,
  );
  useEffect(() => {
    if (photos.length > 0) {
      if (isPinned || !afterOneHour(updatedAt)) return;
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
        setBgImgSettings((prevBgImgSettings) => ({
          ...prevBgImgSettings,
          currentPhoto: 0,
        }));
        return;
      }
      setPhotoData({ photos: defaultPhoto, updatedAt: String(new Date()) });
    };
    getNewPhotos();
  }, [updatedAt, photos.length, isPinned]);
  return (
    <Wrapper>
      {photos.map((photo, index) => (
        <BackgroundImage
          key={photo.id}
          photo={photo}
          currentPhoto={index === currentPhoto}
          isFirstBackgroundLoading={isFirstBackgroundLoading}
          setIsFirstBackgroundLoading={setIsFirstBackgroundLoading}
        />
      ))}
      <Controller
        isPinned={isPinned}
        isPlay={isPlay}
        nextPhoto={nextPhoto}
        prevPhoto={prevPhoto}
        toggleIsPinned={toggleIsPinned}
        toggleIsPlay={toggleIsPlay}
        setCurrentPhoto={setCurrentPhoto}
      />
    </Wrapper>
  );
}

export default Background;
