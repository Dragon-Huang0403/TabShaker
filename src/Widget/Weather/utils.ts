import type { WeatherData } from './Weather';

// https://opendata.cwb.gov.tw/opendatadoc/MFC/D0047.pdf
// https://developer.accuweather.com/weather-icons
const weatherCodeData = [
  {
    weatherCode: '01',
    icon: 'https://developer.accuweather.com/sites/default/files/01-s.png',
    description: 'Sunny',
  },
  {
    weatherCode: '02',
    icon: 'https://developer.accuweather.com/sites/default/files/02-s.png',
    description: 'Mostly Sunny',
  },
  {
    weatherCode: '03',
    icon: 'https://developer.accuweather.com/sites/default/files/03-s.png',
    description: 'Partly Sunny',
  },
  {
    weatherCode: '04',
    icon: 'https://developer.accuweather.com/sites/default/files/06-s.png',
    description: 'Mostly Cloudy',
  },
  {
    weatherCode: '05',
    icon: 'https://developer.accuweather.com/sites/default/files/07-s.png',
    description: 'Mostly Cloudy',
  },
  {
    weatherCode: '06',
    icon: 'https://developer.accuweather.com/sites/default/files/07-s.png',
    description: 'Mostly Cloudy',
  },
  {
    weatherCode: '07',
    icon: 'https://developer.accuweather.com/sites/default/files/07-s.png',
    description: 'Cloudy',
  },
  {
    weatherCode: '08',
    icon: 'https://developer.accuweather.com/sites/default/files/13-s.png',
    description: 'Partly Cloudy with Showers',
  },
  {
    weatherCode: '09',
    icon: 'https://developer.accuweather.com/sites/default/files/13-s.png',
    description: 'Partly Cloudy with Showers',
  },
  {
    weatherCode: '10',
    icon: 'https://developer.accuweather.com/sites/default/files/13-s.png',
    description: 'Partly Cloudy with Showers',
  },
  {
    weatherCode: '11',
    icon: 'https://developer.accuweather.com/sites/default/files/18-s.png',
    description: 'Rainy',
  },
  {
    weatherCode: '12',
    icon: 'https://developer.accuweather.com/sites/default/files/13-s.png',
    description: 'Mostly Cloudy with Showers',
  },
  {
    weatherCode: '13',
    icon: 'https://developer.accuweather.com/sites/default/files/13-s.png',
    description: 'Mostly Cloudy with Showers',
  },
  {
    weatherCode: '14',
    icon: 'https://developer.accuweather.com/sites/default/files/18-s.png',
    description: 'Rainy',
  },
  {
    weatherCode: '15',
    icon: 'https://developer.accuweather.com/sites/default/files/17-s.png',
    description: 'Partly Sunny with T-Storms',
  },
  {
    weatherCode: '16',
    icon: 'https://developer.accuweather.com/sites/default/files/17-s.png',
    description: 'Partly Sunny with T-Storms',
  },
  {
    weatherCode: '17',
    icon: 'https://developer.accuweather.com/sites/default/files/17-s.png',
    description: 'Partly Sunny with T-Storms',
  },
  {
    weatherCode: '18',
    icon: 'https://developer.accuweather.com/sites/default/files/15-s.png',
    description: 'Cloudy with T-Storms',
  },
  {
    weatherCode: '19',
    icon: 'https://developer.accuweather.com/sites/default/files/14-s.png',
    description: 'Cloudy with afternoon Rain',
  },
  {
    weatherCode: '20',
    icon: 'https://developer.accuweather.com/sites/default/files/14-s.png',
    description: 'Cloudy with afternoon Rain',
  },
  {
    weatherCode: '21',
    icon: 'https://developer.accuweather.com/sites/default/files/14-s.png',
    description: 'Cloudy with afternoon Rain',
  },
  {
    weatherCode: '22',
    icon: 'https://developer.accuweather.com/sites/default/files/17-s.png',
    description: 'Cloudy with T-Storms',
  },
  {
    weatherCode: '23',
    icon: 'https://developer.accuweather.com/sites/default/files/29-s.png',
    description: 'Cloudy with Rain and Snow',
  },
  {
    weatherCode: '24',
    icon: 'https://developer.accuweather.com/sites/default/files/05-s.png',
    description: 'Clear with Fog',
  },
  {
    weatherCode: '25',
    icon: 'https://developer.accuweather.com/sites/default/files/05-s.png',
    description: 'Mostly Clear with Fog',
  },
  {
    weatherCode: '26',
    icon: 'https://developer.accuweather.com/sites/default/files/05-s.png',
    description: 'Partly Clear with Fog',
  },
  {
    weatherCode: '27',
    icon: 'https://developer.accuweather.com/sites/default/files/11-s.png',
    description: 'Mostly Cloudy with Fog',
  },
  {
    weatherCode: '28',
    icon: 'https://developer.accuweather.com/sites/default/files/11-s.png',
    description: 'Mostly Cloudy with Fog',
  },
  {
    weatherCode: '29',
    icon: 'https://developer.accuweather.com/sites/default/files/12-s.png',
    description: 'Mostly Cloudy with Rain',
  },
  {
    weatherCode: '30',
    icon: 'https://developer.accuweather.com/sites/default/files/12-s.png',
    description: 'Mostly Cloudy with Rain',
  },
  {
    weatherCode: '31',
    icon: 'https://developer.accuweather.com/sites/default/files/12-s.png',
    description: 'Mostly Cloudy with Rain',
  },
  {
    weatherCode: '32',
    icon: 'https://developer.accuweather.com/sites/default/files/12-s.png',
    description: 'Mostly Cloudy with Rain',
  },
  {
    weatherCode: '33',
    icon: 'https://developer.accuweather.com/sites/default/files/17-s.png',
    description: 'Mostly Cloudy with T-Storms',
  },
  {
    weatherCode: '34',
    icon: 'https://developer.accuweather.com/sites/default/files/17-s.png',
    description: 'Mostly Cloudy with T-Storms',
  },
  {
    weatherCode: '35',
    icon: 'https://developer.accuweather.com/sites/default/files/17-s.png',
    description: 'Mostly Cloudy with T-Storms',
  },
  {
    weatherCode: '36',
    icon: 'https://developer.accuweather.com/sites/default/files/17-s.png',
    description: 'Mostly Cloudy with T-Storms',
  },
  {
    weatherCode: '37',
    icon: 'https://developer.accuweather.com/sites/default/files/17-s.png',
    description: 'Mostly Cloudy with T-Storms',
  },
  {
    weatherCode: '38',
    icon: 'https://developer.accuweather.com/sites/default/files/18-s.png',
    description: 'Rain',
  },
  {
    weatherCode: '39',
    icon: 'https://developer.accuweather.com/sites/default/files/18-s.png',
    description: 'Rain',
  },
  {
    weatherCode: '41',
    icon: 'https://developer.accuweather.com/sites/default/files/18-s.png',
    description: 'Rain',
  },
  {
    weatherCode: '42',
    icon: 'https://developer.accuweather.com/sites/default/files/22-s.png',
    description: 'Snow',
  },
];

const dayName = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export function getDayString(date: Date) {
  const day = date.getDay();
  return dayName[day];
}

export function handleWeatherDataByElementType(data: any): WeatherData[] {
  const weatherDataByElement = [];

  const weatherElement = data.find(
    (element: { elementName: string }) => element.elementName === 'Wx',
  );
  const maxApparentTemperatureElement = data.find(
    (element: { elementName: string }) => element.elementName === 'MaxAT',
  );
  const minApparentTemperatureElement = data.find(
    (element: { elementName: string }) => element.elementName === 'MinAT',
  );
  const temperatureElement = data.find(
    (element: { elementName: string }) => element.elementName === 'T',
  );
  for (let i = 0; i < weatherElement.time.length; i += 2) {
    const startTime = new Date(weatherElement.time[i]?.startTime);
    const maxApparentTemperature = Number(
      maxApparentTemperatureElement.time[i].elementValue[0].value,
    );
    const minApparentTemperature = Number(
      minApparentTemperatureElement.time[i].elementValue[0].value,
    );
    const apparentTemperature = Math.round(
      (maxApparentTemperature + minApparentTemperature) / 2,
    );

    const weatherCode = Number(weatherElement.time[i].elementValue[1].value);
    const weatherType = {
      ...weatherCodeData[weatherCode - 1],
      name: weatherElement.time[i].elementValue[0].value as string,
    };

    weatherDataByElement.push({
      startTime,
      weatherType,
      apparentTemperature,
      temperature: Number(temperatureElement.time[i].elementValue[0].value),
    });
  }
  return weatherDataByElement;
}
