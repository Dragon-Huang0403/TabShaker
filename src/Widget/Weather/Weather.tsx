import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import getWeatherInfoIn36Hours from './weatherApi';
import getCityName from './openStreetMapApi';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  width: 100%;
  height: 100%;
`;

type Location = { lat: number; lon: number };

function Weather() {
  const [location, setLocation] = useState<Location | null>(null);
  const [cityName, setCityName] = useState('');
  const [weather, setWeather] = useState(null);
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
    const updateCityName = async () => {
      const osmData = await getCityName(location);
      if (osmData?.address?.city) {
        setCityName(osmData.address.city);
      }
    };
    updateCityName();
  }, [location]);

  useEffect(() => {
    if (!cityName) return;
    const updateWeatherInfo = async () => {
      const weatherData = await getWeatherInfoIn36Hours(cityName);
      const newWeather = weatherData?.records?.location?.[0];
      if (newWeather) {
        setWeather(newWeather);
      }
    };
    updateWeatherInfo();
  }, [cityName]);
  console.log('weather', weather);
  return <Wrapper>Weather</Wrapper>;
}

export default Weather;
