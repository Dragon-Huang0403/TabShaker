import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import getCityData from './openStreetMapApi';
import {
  handleWeatherDataByElementType,
  getWeatherIcon,
  getWeatherDayByDay,
  getWeatherDesc,
  getDayString,
} from './utils';
import getWeatherDataByChineseCityName from './weatherApi';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.purple};
  width: 100%;
  height: 100%;
  display: flex;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CurrentWeather = styled.div`
  height: 100%;
  width: 140px;
  display: flex;
  flex-direction: column;
  padding-top: 10px;
  text-align: center;
`;

const CurrentTemperature = styled.div`
  margin-top: auto;
  font-size: 2.5rem;
`;
const ApparentTemperature = styled.div`
  color: ${({ theme }) => theme.color.lavenderBlue};
  padding: 5px 5px 30px 10px;
  text-align: center;
  font-size: 1rem;
`;

const RightPartWrapper = styled.div`
  flex-grow: 1;
  padding: 20px 20px 0 0;
  text-align: end;
  display: flex;
  flex-direction: column;
`;

const LocationWrapper = styled.div`
  font-size: 1.125rem;
`;

const WeatherDescription = styled.div`
  margin-top: 5px;
  font-weight: 600;
  font-size: 1.25rem;
`;

const WeatherForecastWrapper = styled.div`
  color: ${({ theme }) => theme.color.lavenderBlue};
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
  padding-bottom: 20px;

  & > div {
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & img {
    width: 100%;
  }
`;

type Location = { lat: number; lon: number };
type CityData = {
  chinese: { state: string };
  english: { state: string; suburb: string };
};

export type WeatherData = {
  startTime: Date;
  endTime: Date;
  weatherType: {
    name: string;
    value: number;
  };
  precipitationProbability: number;
  apparentTemperature: number;
  temperature: number;
};

function Weather() {
  const [location, setLocation] = useState<Location | null>(null);
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  }, []);
  useEffect(() => {
    if (!location) return;
    const updateCityData = async () => {
      const newCityData = await getCityData(location);
      setCityData(newCityData);
    };
    updateCityData();
  }, [location?.lat, location?.lon]);

  useEffect(() => {
    if (!cityData) return;
    const updateWeatherData = async () => {
      const weatherRawData = await getWeatherDataByChineseCityName(
        cityData.chinese.state,
      );
      if (weatherRawData.success === 'true') {
        const weatherDataByElementType = handleWeatherDataByElementType(
          weatherRawData?.records?.locations?.[0]?.location?.[0]
            ?.weatherElement,
        );
        const weatherDataByDay = getWeatherDayByDay(weatherDataByElementType);
        setWeatherData(weatherDataByDay);
      }
    };
    updateWeatherData();
  }, [cityData]);

  if (!location || !cityData || weatherData.length === 0) {
    return (
      <Wrapper>
        <LoadingWrapper>
          <ReactLoading type="spin" />
        </LoadingWrapper>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <CurrentWeather>
        <img src={getWeatherIcon(weatherData[0].weatherType.value)} alt="" />
        <CurrentTemperature>{weatherData[0].temperature}°</CurrentTemperature>
        <ApparentTemperature>
          Feel like {weatherData[0].apparentTemperature}°
        </ApparentTemperature>
      </CurrentWeather>
      <RightPartWrapper>
        <LocationWrapper>{cityData.english.suburb}</LocationWrapper>
        <WeatherDescription>
          {getWeatherDesc(weatherData[0].weatherType.value)}
        </WeatherDescription>
        <WeatherForecastWrapper>
          {weatherData.slice(1).map((dayWeather, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <div key={index}>
              <span>{dayWeather.temperature}°</span>
              <img
                src={getWeatherIcon(dayWeather.weatherType.value)}
                alt="weather"
              />
              <span>{getDayString(dayWeather.startTime)}</span>
            </div>
          ))}
        </WeatherForecastWrapper>
      </RightPartWrapper>
    </Wrapper>
  );
}

export default Weather;
