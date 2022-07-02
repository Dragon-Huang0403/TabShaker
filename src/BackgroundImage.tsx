/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import unsplashApi, { UnsplashResponseData } from './utils/unsplashApi';
import { ArrowBack, ArrowForward, PlayArrow, Pause } from './components/Icons';
import useInterval from './hooks/useSetInterval';

const TIME_TO_GET_NEW_PHOTOS = 3600000;
const TIME_TO_NEXT_PHOTO = 60000;

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

const BackgroundImg = styled.div<{ url: string; isCurrentPhoto: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.5s;
  visibility: visible;
  background-size: cover;
  background-position: 50% 50%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 20px 20px;
  color: ${({ theme }) => theme.color.white};
  font-size: 0.75rem;
  opacity: 0.8;
  ${({ url }) =>
    url &&
    css`
      background-image: url(${url});
    `}
  ${({ isCurrentPhoto }) =>
    !isCurrentPhoto &&
    css`
      visibility: hidden;
      opacity: 0;
    `}
`;

const Links = styled.div`
  display: flex;
  gap: 5px;
  & > a:hover {
    text-decoration: underline;
  }
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
`;

const IconStyle = styled.div`
  &:hover {
    cursor: pointer;
    background: ${({ theme }) => theme.color.transparentWhite};
    border-radius: 50%;
  }
  & svg {
    fill: ${({ theme }) => theme.color.lightBlue};
    width: 24px;
    height: 24px;
  }
`;

function BackgroundImage() {
  const [photos, setPhotos] = useState<UnsplashResponseData[]>([]);
  const [isPlay, setIsPlay] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const nextPhoto = currentPhoto + 1 < photos.length ? currentPhoto + 1 : 0;
  const prevPhoto =
    currentPhoto - 1 >= 0 ? currentPhoto - 1 : photos.length - 1;

  useInterval(
    () => {
      setCurrentPhoto(nextPhoto);
    },
    isPlay ? TIME_TO_NEXT_PHOTO : null,
  );

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

  return (
    <Wrapper>
      {photos.map((photo, index) => (
        <BackgroundImg
          key={photo.id}
          url={`${photo.urls.raw}&q=85&w=1920`}
          isCurrentPhoto={index === currentPhoto}
        >
          <Links>
            <a
              href={`${photo.links.html}?utm_source=TapShaker&utm_medium=referral&utm_campaign=api-credit`}
            >
              Photo
            </a>
            <a
              href={`${photo.user.links.html}?utm_source=TapShaker&utm_medium=referral&utm_campaign=api-credit`}
            >
              {photo.user.name}
            </a>
            <a href="https://unsplash.com/?utm_source=TapShaker&utm_medium=referral&utm_campaign=api-credit">
              Unsplash
            </a>
          </Links>
          <div>{photo.location.title}</div>
        </BackgroundImg>
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

export default BackgroundImage;
