const baseUrl = 'https://nominatim.openstreetmap.org/reverse?format=json';

type Location = { lat: number; lon: number };

async function getCityDataInChinese(location: Location) {
  const url = `${baseUrl}&lat=${location.lat}&lon=${location.lon}&zoom=18&addressdetails=1&accept-language=TW`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
export async function getCityDataInEnglish(location: Location) {
  const url = `${baseUrl}&lat=${location.lat}&lon=${location.lon}&zoom=18&addressdetails=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

type CityDataFromOpenStreet = {
  road: string;
  neighbourhood: string;
  suburb: string;
  village: string;
  city: string;
  'ISO3166-2-lvl6': string;
  state: string;
  postcode: string;
  country: string;
  country_code: string;
};

export default async function getCityData(location: Location) {
  const cityDataInChinese = await getCityDataInChinese(location);

  return cityDataInChinese.address as CityDataFromOpenStreet;
}
