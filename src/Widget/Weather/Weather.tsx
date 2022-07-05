import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  width: 100%;
  height: 100%;
`;

function Weather() {
  return <Wrapper>Weather</Wrapper>;
}

export default Weather;
