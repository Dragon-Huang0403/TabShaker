import type { WeatherData } from './Weather';

function getWeatherImageUrl(weatherIcon: number) {
  const weatherIconToString = String(weatherIcon).padStart(2, '0');
  const imageUrl = `https://developer.accuweather.com/sites/default/files/${weatherIconToString}-s.png`;
  return imageUrl;
}

// https://opendata.cwb.gov.tw/opendatadoc/MFC/D0047.pdf
// https://developer.accuweather.com/weather-icons
export function getWeatherIcon(weatherValue: number) {
  if (weatherValue < 4) {
    return getWeatherImageUrl(weatherValue);
  }
  if (weatherValue <= 6) {
    return getWeatherImageUrl(6);
  }
  if (weatherValue === 7) {
    return getWeatherImageUrl(7);
  }
  if (![8, 9, 10, 12, 13].includes(weatherValue)) {
    if (weatherValue === 11 || weatherValue === 14) {
      return getWeatherImageUrl(12);
    }
    if (weatherValue <= 18) {
      return getWeatherImageUrl(15);
    }
    if (weatherValue <= 22) {
      return getWeatherImageUrl(16);
    }
    if (weatherValue === 23) {
      return getWeatherImageUrl(29);
    }
    if (weatherValue <= 28) {
      return getWeatherImageUrl(11);
    }
  }
  return getWeatherImageUrl(13);
}

export function getWeatherDesc(weatherValue: number) {
  if (weatherValue === 0) {
    return 'Sunny';
  }
  if (weatherValue === 1) {
    return 'Mostly Sunny';
  }
  if (weatherValue === 2) {
    return 'Partly Sunny';
  }
  if (weatherValue === 3) {
    return 'Partly Sunny';
  }
  if (weatherValue <= 6) {
    return 'Mostly Cloudy';
  }
  if (weatherValue === 7) {
    return 'Cloudy';
  }
  if (![8, 9, 10, 12, 13].includes(weatherValue)) {
    if (weatherValue === 11 || weatherValue === 14) {
      return 'Showers';
    }
    if (weatherValue <= 18) {
      return 'Thunderstorms';
    }
    if (weatherValue <= 22) {
      return 'Cloudy with Thunderstorms';
    }
    if (weatherValue === 23) {
      return 'Rain and Snow';
    }
    if (weatherValue <= 28) {
      return 'Fog';
    }
  }
  return 'Cloudy with Showers';
}

const dayName = ['', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export function getDayString(date: Date) {
  const day = date.getDay();
  return dayName[day];
}

export function handleWeatherDataByElementType(data: any) {
  const weatherDataByElement = [];

  const weatherElement = data.find(
    (element: { elementName: string }) => element.elementName === 'Wx',
  );
  const popElement = data.find(
    (element: { elementName: string }) => element.elementName === 'PoP6h',
  );
  const apparentTemperatureElement = data.find(
    (element: { elementName: string }) => element.elementName === 'AT',
  );
  const temperatureElement = data.find(
    (element: { elementName: string }) => element.elementName === 'T',
  );
  for (let i = 0; i < weatherElement.time.length; i += 1) {
    const startTime = new Date(weatherElement.time[i]?.startTime);
    const endTime = new Date(weatherElement.time[i]?.endTime);

    weatherDataByElement.push({
      startTime,
      endTime,
      weatherType: {
        name: weatherElement.time[i].elementValue[0],
        value: Number(weatherElement.time[i].elementValue[1]),
      },
      precipitationProbability: Number(
        popElement.time[Math.floor(i / 2)].elementValue[0].value,
      ),
      apparentTemperature: Number(
        apparentTemperatureElement.time[i].elementValue[0].value,
      ),
      temperature: Number(temperatureElement.time[i].elementValue[0].value),
    });
  }
  return weatherDataByElement;
}

export function getWeatherDayByDay(weatherData: WeatherData[]) {
  const newWeatherData: WeatherData[] = [];
  let day = -1;
  let hour = -1;
  weatherData.forEach((data, index) => {
    if (index === 0) {
      hour = data.startTime.getHours();
    }
    if (data.startTime.getDay() === day) return;
    if (data.startTime.getHours() === hour) {
      day = data.startTime.getDay();
      newWeatherData.push(data);
    }
  });
  return newWeatherData;
}
