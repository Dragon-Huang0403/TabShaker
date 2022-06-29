import React from 'react';
import styled from 'styled-components';
import googleIconsPhoto from './google_icons.png';
import googleIcons from './googleIconsData';

const Wrapper = styled.div`
  display: inline-grid;
  background: ${({ theme }) => theme.color.white};
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%), 0 25px 50px 0 rgb(0 0 0 / 10%);
`;

const Icon = styled.div`
  width: 64px;
  height: 64px;
  background-image: url(${googleIconsPhoto});
`;

const StyledLink = styled.a`
  display: inline-block;
  width: 94px;
  text-align: center;
  padding: 10px 15px 5px;

  &:hover {
    background: #3331;
    border-radius: 10px;
  }
`;

function GoogleMenu() {
  return (
    <Wrapper>
      {googleIcons.map((icon) => (
        <StyledLink href={icon.url}>
          <Icon
            style={{
              backgroundPosition: icon.backgroundPosition,
            }}
          />
          <span>{icon.text}</span>
        </StyledLink>
      ))}
    </Wrapper>
  );
}

export default GoogleMenu;
