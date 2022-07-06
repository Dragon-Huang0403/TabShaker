const baseUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/';
const API_KEY = process.env.REACT_APP_CWB_WEATHER_API_KEY;

export default async function getWeatherNoDataByChineseCityName(
  cityName = '臺北市',
) {
  const url = `${baseUrl}F-D0047-089?Authorization=${API_KEY}&locationName=${cityName}&sort=time`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
