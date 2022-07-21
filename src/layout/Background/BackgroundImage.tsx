import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';

import type { UnsplashResponseData } from './unsplashApi';

const Wrapper = styled.div<{ isShow: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: 50% 50%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0px 20px 20px;
  color: ${({ theme }) => theme.color.white};
  font-size: 0.75rem;
  user-select: none;
  opacity: 0;

  ${({ isShow }) =>
    isShow &&
    css`
      opacity: 1;
      animation: fadeIn ease 0.5s;
    `}
`;

const Links = styled.div`
  display: flex;
  gap: 5px;
  & > a:hover {
    text-decoration: underline;
  }
`;

interface ImageProps {
  photo: UnsplashResponseData;
  currentPhoto: boolean;
  isFirstBackgroundLoading: boolean;
  setIsFirstBackgroundLoading: (loading: true) => void;
}

function BackgroundImage({
  photo,
  currentPhoto,
  isFirstBackgroundLoading,
  setIsFirstBackgroundLoading,
}: ImageProps) {
  const { url: imageUrl } = photo.urls;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded) return;
    if (isFirstBackgroundLoading || currentPhoto) {
      const imageLoader = new Image();
      imageLoader.src = imageUrl;
      imageLoader.onload = () => {
        setIsLoaded(true);
        setIsFirstBackgroundLoading(true);
      };
    }
  }, [isFirstBackgroundLoading, currentPhoto]);
  const backgroundImage = isLoaded ? `url(${imageUrl})` : '';

  return (
    <Wrapper style={{ backgroundImage }} isShow={isLoaded && currentPhoto}>
      <Links>
        <a
          href={`${photo.links?.html}?utm_source=TapShaker&utm_medium=referral&utm_campaign=api-credit`}
        >
          Photo
        </a>
        <a
          href={`${photo.user?.links?.html}?utm_source=TapShaker&utm_medium=referral&utm_campaign=api-credit`}
        >
          {photo.user?.name}
        </a>
        <a href="https://unsplash.com/?utm_source=TapShaker&utm_medium=referral&utm_campaign=api-credit">
          Unsplash
        </a>
      </Links>
      <div>{photo.location?.title}</div>
    </Wrapper>
  );
}

export default BackgroundImage;
