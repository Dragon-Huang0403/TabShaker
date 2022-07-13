import React, { useEffect, useState, useRef } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import getCityData from './openStreetMapApi';
import {
  handleWeatherDataByElementType,
  getWeatherIcon,
  getWeatherDesc,
  getDayString,
} from './utils';
import getWeatherDataByChineseCityName, { taiwanCityList } from './weatherApi';
import WeatherLocation from './WeatherLocation';

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

const CurrentWeather = styled.div<{ paddingTop: number }>`
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

const ApparentTemperature = styled.div<{ marginTop: string }>`
  color: ${({ theme }) => theme.color.lavenderBlue};
  padding: 5px 5px 30px 10px;
  text-align: center;
  font-size: 1rem;
  margin-top: ${({ marginTop }) => marginTop};
`;

const RightPartWrapper = styled.div<{ fontSize: number; paddingTop: number }>`
  flex-grow: 1;
  flex-shrink: 10;
  padding: ${({ paddingTop }) => paddingTop}px 30px 0 0;
  text-align: end;
  display: flex;
  flex-direction: column;
  font-size: ${({ fontSize }) => fontSize}rem;
`;

const WeatherDescription = styled.div`
  margin-top: 5px;
  font-weight: 600;
`;

const WeatherForecastWrapper = styled.div`
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

type Location = { lat: number; lon: number };
export type CityData = {
  chinese: string;
  english: string;
};

export type WeatherData = {
  startTime: Date;
  weatherType: {
    name: string;
    value: number;
  };
  apparentTemperature: number;
  temperature: number;
};

function Weather() {
  const [location, setLocation] = useState<Location | null>(null);
  const [cityData, setCityData] = useState<CityData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [renderWidthMode, setRenderWidthMode] = useState(0);
  const [renderHeightMode, setRenderHeightMode] = useState(0);

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
      }
    };
    updateWeatherData();
  }, [cityData]);

  useEffect(() => {
    if (!wrapperRef.current) return;
    const gridItem = wrapperRef.current.parentNode as HTMLElement;
    const width = gridItem.clientWidth;
    const height = gridItem.clientHeight;
    const updateRenderWidthMode = () => {
      if (width <= 250) {
        setRenderWidthMode(2);
        return;
      }
      if (width <= 300) {
        setRenderWidthMode(1);
        return;
      }
      setRenderWidthMode(0);
    };
    const updateRenderHeightMode = () => {
      if (height <= 150) {
        setRenderHeightMode(3);
        return;
      }
      if (height <= 175) {
        setRenderHeightMode(2);
        return;
      }
      if (height <= 200) {
        setRenderHeightMode(1);
        return;
      }
      setRenderHeightMode(0);
    };

    updateRenderWidthMode();
    updateRenderHeightMode();
  });
  // console.log({ width, height });
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
    <Wrapper
      ref={wrapperRef}
      justifyContent={renderWidthMode === 2 ? 'center' : 'space-between'}
    >
      <CurrentWeather paddingTop={renderHeightMode === 1 ? 20 : 10}>
        <img src={getWeatherIcon(weatherData[0].weatherType.value)} alt="" />
        {renderHeightMode === 0 ? (
          <CurrentTemperature>{weatherData[0].temperature}°</CurrentTemperature>
        ) : (
          <CurrentTemperatureFloat>
            {weatherData[0].temperature}°
          </CurrentTemperatureFloat>
        )}
        {renderHeightMode === 3 ? null : (
          <ApparentTemperature
            marginTop={renderHeightMode === 1 ? 'auto' : '0'}
          >
            Feel like {weatherData[0].apparentTemperature}°
          </ApparentTemperature>
        )}
      </CurrentWeather>
      {renderWidthMode === 2 ? null : (
        <RightPartWrapper
          fontSize={renderWidthMode === 1 ? 0.75 : 1}
          paddingTop={renderHeightMode >= 2 ? 10 : 20}
        >
          {renderHeightMode >= 2 ? null : (
            <WeatherLocation cityData={cityData} setCityData={setCityData} />
          )}
          {renderHeightMode === 3 ? null : (
            <WeatherDescription>
              {getWeatherDesc(weatherData[0].weatherType.value)}
            </WeatherDescription>
          )}
          <WeatherForecastWrapper>
            <div>
              <span>{weatherData?.[1].temperature}°</span>
              <img
                src={getWeatherIcon(weatherData?.[1].weatherType.value)}
                alt="weather"
              />
              <span>{getDayString(weatherData?.[1].startTime)}</span>
            </div>
            {renderWidthMode === 1 ? null : (
              <div>
                <span>{weatherData?.[2].temperature}°</span>
                <img
                  src={getWeatherIcon(weatherData?.[2].weatherType.value)}
                  alt="weather"
                />
                <span>{getDayString(weatherData?.[2].startTime)}</span>
              </div>
            )}
          </WeatherForecastWrapper>
        </RightPartWrapper>
      )}
    </Wrapper>
  );
}

export default Weather;
