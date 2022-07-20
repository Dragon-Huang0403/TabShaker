export type Location = { lat: number; lon: number };

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
