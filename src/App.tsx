import React, { useEffect, useState } from 'react';
import styled, { ThemeProvider, css } from 'styled-components';
import globalTheme, { GlobalStyle } from './theme';
import NavBar from './NavBar';
import Widgets from './Widgets';
import unsplashApi from './utils/unsplashApi';

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
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

interface Photo {
  id: string;
  imageUrl: string;
}

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  useEffect(() => {
    unsplashApi().then(setPhotos);
  }, []);
  return (
    <ThemeProvider theme={globalTheme}>
      <GlobalStyle />
      <BackgroundImg url={photos[0]?.imageUrl || ''} />
      <Wrapper>
        <NavBar />
        <Widgets />
      </Wrapper>
    </ThemeProvider>
  );
}

export default App;
