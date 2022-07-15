import React, { useEffect, useState } from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';
import getCityData from './openStreetMapApi';
import { handleWeatherDataByElementType, getDayString } from './utils';
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
    weatherCode: string;
    description: string;
    icon: string;
  };
  apparentTemperature: number;
  temperature: number;
};

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

    const updateRenderWidthMode = () => {
      if (width <= 250) {
        setRenderWidthMode(2);
        return;
      }
      if (width <= 294) {
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
  }, [width, height]);

  if (isLoading) {
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
      justifyContent={renderWidthMode === 2 ? 'center' : 'space-between'}
    >
      <CurrentWeather paddingTop={renderHeightMode === 1 ? 20 : 10}>
        <img src={weatherData[0].weatherType.icon} alt="weatherIcon" />
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
            <WeatherLocation cityData={cityData!} setCityData={setCityData} />
          )}
          {renderHeightMode === 3 ? null : (
            <WeatherDescription>
              {weatherData[0].weatherType.description}
            </WeatherDescription>
          )}
          <WeatherForecastWrapper>
            <div>
              <span>{weatherData?.[1].temperature}°</span>
              <img src={weatherData?.[1].weatherType.icon} alt="weather" />
              <span>{getDayString(weatherData?.[1].startTime)}</span>
            </div>
            {renderWidthMode === 1 ? null : (
              <div>
                <span>{weatherData?.[2].temperature}°</span>
                <img src={weatherData?.[2].weatherType.icon} alt="weather" />
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
