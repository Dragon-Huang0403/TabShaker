/* eslint-disable react/no-array-index-key */
import React, { useEffect } from 'react';
import styled, { css } from 'styled-components';
import unsplashApi, { UnsplashResponseData } from './utils/unsplashApi';
import { ArrowBack, ArrowForward, PlayArrow, Pause } from './components/Icons';
import useInterval from './hooks/useSetInterval';
import useLocalStorage from './hooks/useLocalStorage';
import { afterOneHour } from './utils/lib';

const TIME_TO_NEXT_PHOTO = 30000;

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
  user-select: none;
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

function BackgroundImage() {
  const [photoData, setPhotoData] = useLocalStorage<PhotoData>('bgImgData', {
    photos: [],
    updatedAt: String(new Date()),
  });
  const [bgImgSettings, setBgImgSettings] = useLocalStorage('bgImgSettings', {
    isPlay: false,
    currentPhoto: 0,
  });
  const { photos, updatedAt } = photoData;
  const { isPlay, currentPhoto } = bgImgSettings;
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
    isPlay ? TIME_TO_NEXT_PHOTO : null,
  );

  useEffect(() => {
    if (photos.length > 0 && !afterOneHour(updatedAt)) {
      return;
    }
    const updatePhotos = async () => {
      const newPhotos = await unsplashApi();
      setPhotoData({ photos: newPhotos, updatedAt: String(new Date()) });
    };

    updatePhotos();
  }, [updatedAt, photos.length]);

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
