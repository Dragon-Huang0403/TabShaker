import React from 'react';
import styled from 'styled-components';

import type { WeatherData } from './type';

const Wrapper = styled.div<{ paddingTop: number }>`
  flex-shrink: 1;
  flex-basis: 140px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-top: ${({ paddingTop }) => paddingTop}px;
  text-align: center;
  position: relative;
`;

const CurrentTemperature = styled.div`
  margin-top: auto;
  font-size: 2.5rem;
`;

const CurrentTemperatureFloat = styled.div`
  width: 50px;
  line-height: 50px;
  border-radius: 50%;
  position: absolute;
  font-size: 1.75rem;
  top: 0px;
  right: 0px;
`;

interface CurrentWeatherProps {
  renderHeightMode: number;
  currentWeather: WeatherData;
}

const ApparentTemperature = styled.div<{ marginTop: string }>`
  color: ${({ theme }) => theme.color.lavenderBlue};
  padding: 5px 5px 30px 10px;
  text-align: center;
  font-size: 1rem;
  margin-top: ${({ marginTop }) => marginTop};
`;

function CurrentWeather({
  renderHeightMode,
  currentWeather,
}: CurrentWeatherProps) {
  const { weatherType, temperature, apparentTemperature } = currentWeather;

  return (
    <Wrapper paddingTop={renderHeightMode === 1 ? 20 : 10}>
      <img src={weatherType.icon} alt="weatherIcon" />
      {renderHeightMode === 0 ? (
        <CurrentTemperature>{temperature}°</CurrentTemperature>
      ) : (
        <CurrentTemperatureFloat>{temperature}°</CurrentTemperatureFloat>
      )}
      {renderHeightMode === 3 ? null : (
        <ApparentTemperature marginTop={renderHeightMode === 1 ? 'auto' : '0'}>
          Feel like {apparentTemperature}°
        </ApparentTemperature>
      )}
    </Wrapper>
  );
}

export default CurrentWeather;
