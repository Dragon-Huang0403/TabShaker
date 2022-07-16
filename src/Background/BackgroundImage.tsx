import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import type { UnsplashResponseData } from '../utils/unsplashApi';

const Wrapper = styled.div`
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
}

function BackgroundImage({ photo, currentPhoto }: ImageProps) {
  const { url: imageUrl } = photo.urls;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const imageLoader = new Image();
    imageLoader.src = imageUrl;
    imageLoader.onload = () => {
      setIsLoaded(true);
    };
  }, []);

  const style: React.CSSProperties =
    isLoaded && currentPhoto
      ? {
          backgroundImage: `url(${imageUrl})`,
          animation: 'fadeIn ease 0.5s',
          opacity: 1,
        }
      : {};

  return (
    <Wrapper style={style}>
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
