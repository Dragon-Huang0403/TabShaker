import React from 'react';
import styled from 'styled-components';

import { getDayString } from './utils';

import type { WeatherData } from './type';

const Wrapper = styled.div`
  color: ${({ theme }) => theme.color.lavenderBlue};
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding-bottom: 20px;

  & > div {
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & img {
    width: 100%;
  }
`;

interface WeatherForecastProps {
  renderWidthMode: number;
  tomorrowWeather: WeatherData;
  datAfterTomorrowWeather: WeatherData;
}

function WeatherForecast({
  renderWidthMode,
  tomorrowWeather,
  datAfterTomorrowWeather,
}: WeatherForecastProps) {
  return (
    <Wrapper>
      <div>
        <span>{tomorrowWeather.temperature}°</span>
        <img src={tomorrowWeather.weatherType.icon} alt="weather" />
        <span>{getDayString(tomorrowWeather.startTime)}</span>
      </div>
      {renderWidthMode === 1 ? null : (
        <div>
          <span>{datAfterTomorrowWeather.temperature}°</span>
          <img src={datAfterTomorrowWeather.weatherType.icon} alt="weather" />
          <span>{getDayString(datAfterTomorrowWeather.startTime)}</span>
        </div>
      )}
    </Wrapper>
  );
}

export default WeatherForecast;
