const baseUrl = 'https://opendata.cwb.gov.tw/api/v1/rest/datastore/';
const API_KEY = process.env.REACT_APP_CWB_WEATHER_API_KEY;
// const fetchOptions = { headers: { 'content-type': 'application/json' } };

export default async function getWeatherInfoIn36Hours(cityName = '臺北市') {
  const url = `${baseUrl}F-C0032-001?Authorization=${API_KEY}&locationName=${cityName}`;
  const weatherDataRes = await fetch(url);
  const weatherData = await weatherDataRes.json();
  return weatherData;
}
