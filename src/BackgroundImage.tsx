import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import unsplashApi from './utils/unsplashApi';
import { ArrowBack, ArrowForward, PlayArrow, Pause } from './components/Icons';

const TIME_TO_GET_NEW_PHOTOS = 3600000;

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

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

const IconsWrapper = styled.div`
  display: inline-block;
  background: #0009;
  z-index: 1;
  margin-bottom: 20px;
  padding: 5px 15px;
  border-radius: 20px;
  display: flex;
  gap: 5px;
`;

const IconStyle = styled.div`
  &:hover {
    cursor: pointer;
    background: #fff3;
    border-radius: 50%;
  }
  & svg {
    fill: #3498db;
    width: 24px;
    height: 24px;
  }
`;

interface Photo {
  id: string;
  imageUrl: string;
}

function BackgroundImage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [isPlay, setIsPlay] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  useEffect(() => {
    const rawData = window.localStorage.getItem('backgroundImages');
    const currentTime = new Date();
    if (rawData) {
      const data = JSON.parse(rawData);
      const lastPhotoUpdateTime = Number(data.updateTime);
      if (
        currentTime.getTime() - lastPhotoUpdateTime <
        TIME_TO_GET_NEW_PHOTOS
      ) {
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
  const nextPhoto = currentPhoto + 1 < photos.length ? currentPhoto + 1 : 0;
  const prevPhoto =
    currentPhoto - 1 >= 0 ? currentPhoto - 1 : photos.length - 1;
  return (
    <Wrapper>
      <BackgroundImg
        url={photos[prevPhoto]?.imageUrl || ''}
        style={{ visibility: 'hidden' }}
      />
      <BackgroundImg url={photos[currentPhoto]?.imageUrl || ''} />
      <BackgroundImg
        url={photos[nextPhoto]?.imageUrl || ''}
        style={{ visibility: 'hidden' }}
      />
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
              setIsPlay(true);
            }}
          >
            <Pause />
          </IconStyle>
        ) : (
          <IconStyle
            onClick={() => {
              setIsPlay(false);
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

export default BackgroundImage;
