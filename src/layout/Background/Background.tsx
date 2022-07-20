/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled from 'styled-components';

import BackgroundImage from './BackgroundImage';
import unsplashApi, { UnsplashResponseData } from './unsplashApi';
import {
  ArrowBack,
  ArrowForward,
  PlayArrow,
  Pause,
} from '../../components/Icons';
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

const IconsWrapper = styled.div`
  display: inline-block;
  background: ${({ theme }) => theme.color.transparentBlack};
  z-index: 1;
  margin-bottom: 20px;
  padding: 5px 15px;
  border-radius: 20px;
  display: flex;
  gap: 5px;

  &:hover {
    box-shadow: 0px 0px 10px -2px ${({ theme }) => theme.color.white};
  }
`;

const IconStyle = styled.div`
  width: 24px;
  height: 24px;
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.transparentWhite};
    border-radius: 50%;
  }
  & svg {
    fill: ${({ theme }) => theme.color.lightBlue};
    width: 100%;
    height: 100%;
  }
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
  const nextPhoto = currentPhoto + 1 < photos.length ? currentPhoto + 1 : 0;
  const prevPhoto =
    currentPhoto - 1 >= 0 ? currentPhoto - 1 : photos.length - 1;

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
      <IconsWrapper>
        <IconStyle
          onClick={() => {
            setCurrentPhoto(prevPhoto);
          }}
        >
          <ArrowBack />
        </IconStyle>
        {isPlay ? (
          <IconStyle
            onClick={() => {
              setIsPlay(false);
            }}
          >
            <Pause />
          </IconStyle>
        ) : (
          <IconStyle
            onClick={() => {
              setIsPlay(true);
            }}
          >
            <PlayArrow />
          </IconStyle>
        )}
        <IconStyle
          onClick={() => {
            setCurrentPhoto(nextPhoto);
          }}
        >
          <ArrowForward />
        </IconStyle>
      </IconsWrapper>
    </Wrapper>
  );
}

export default Background;
