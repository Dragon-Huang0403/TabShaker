import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import ReactLoading from 'react-loading';

import WeatherLocation from './WeatherLocation';
import CurrentWeather from './CurrentWeather';
import WeatherForecast from './WeatherForecast';
import getCityData from './openStreetMapApi';
import getWeatherDataByChineseCityName, { taiwanCityList } from './weatherApi';
import {
  handleWeatherDataByElementType,
  getRenderWidthMode,
  getRenderHeightMode,
} from './utils';

import type { Location, CityData, WeatherData } from './type';

const Wrapper = styled.div<{ justifyContent?: string }>`
  border-radius: 15px;
  background: ${({ theme }) => theme.color.littleTransparentBlack};
  color: ${({ theme }) => theme.color.purple};
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent};
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightPartWrapper = styled.div<{ fontSize: number; paddingTop: number }>`
  flex-grow: 1;
  flex-shrink: 10;
  padding: ${({ paddingTop }) => paddingTop}px 25px 0 0;
  text-align: end;
  display: flex;
  flex-direction: column;
  font-size: ${({ fontSize }) => fontSize}rem;
`;

const WeatherDescription = styled.div`
  margin-top: 5px;
  font-weight: 600;
`;

interface WeatherProps {
  width: number;
  height: number;
}

function Weather({ width, height }: WeatherProps) {
  const [location, setLocation] = useState<Location | null>(null);
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [renderWidthMode, setRenderWidthMode] = useState(0);
  const [renderHeightMode, setRenderHeightMode] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      });
    });
  }, []);

  useEffect(() => {
    if (!location) {
      setCityData(taiwanCityList[0]);
      return;
    }
    const updateCityData = async () => {
      const newCityData = await getCityData(location);
      const stateFindCity = taiwanCityList.find(
        (taiwanCity) => taiwanCity.chinese === newCityData.state,
      );
      if (stateFindCity) {
        setCityData(stateFindCity);
        return;
      }
      const cityFindCity = taiwanCityList.find(
        (taiwanCity) => taiwanCity.chinese === newCityData.city,
      );
      if (cityFindCity) {
        setCityData(cityFindCity);
        return;
      }
      setCityData(taiwanCityList[0]);
    };
    updateCityData();
  }, [location?.lat, location?.lon]);

  useEffect(() => {
    if (!cityData) return;
    const updateWeatherData = async () => {
      const cityName = cityData.chinese;
      const weatherRawData = await getWeatherDataByChineseCityName(cityName);
      if (weatherRawData.success === 'true') {
        const weatherDataByElementType = handleWeatherDataByElementType(
          weatherRawData?.records?.locations?.[0]?.location?.[0]
            ?.weatherElement,
        );
        setWeatherData(weatherDataByElementType);
        setIsLoading(false);
      }
    };
    setIsLoading(true);
    updateWeatherData();
  }, [cityData]);

  useEffect(() => {
    if (width === -1 || height === -1) return;

    const newRenderWidthMode = getRenderWidthMode(width);
    const newRenderHeightMode = getRenderHeightMode(width);
    setRenderWidthMode(newRenderWidthMode);
    setRenderHeightMode(newRenderHeightMode);
  }, [width, height]);

  return (
    <Wrapper
      justifyContent={renderWidthMode === 2 ? 'center' : 'space-between'}
    >
      {isLoading ? (
        <Wrapper>
          <LoadingWrapper>
            <ReactLoading type="spin" />
          </LoadingWrapper>
        </Wrapper>
      ) : (
        <>
          <CurrentWeather
            renderHeightMode={renderHeightMode}
            currentWeather={weatherData[0]}
          />
          {renderWidthMode === 2 ? null : (
            <RightPartWrapper
              fontSize={renderWidthMode === 1 ? 0.75 : 1}
              paddingTop={renderHeightMode >= 2 ? 10 : 20}
            >
              {renderHeightMode >= 2 ? null : (
                <WeatherLocation
                  cityData={cityData!}
                  setCityData={setCityData}
                />
              )}
              {renderHeightMode === 3 ? null : (
                <WeatherDescription>
                  {weatherData[0].weatherType.description}
                </WeatherDescription>
              )}
              <WeatherForecast
                renderWidthMode={renderWidthMode}
                tomorrowWeather={weatherData[1]}
                datAfterTomorrowWeather={weatherData[2]}
              />
            </RightPartWrapper>
          )}
        </>
      )}
    </Wrapper>
  );
}

export default Weather;
