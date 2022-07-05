const baseUrl = 'https://nominatim.openstreetmap.org/reverse?format=json';

type Location = { lat: number; lon: number };

async function getCityDataInChinese(location: Location) {
  const url = `${baseUrl}&lat=${location.lat}&lon=${location.lon}&zoom=18&addressdetails=1&accept-language=TW`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
async function getCityDataInEnglish(location: Location) {
  const url = `${baseUrl}&lat=${location.lat}&lon=${location.lon}&zoom=18&addressdetails=1`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export default async function getCityData(location: Location) {
  const [cityDataInChinese, cityDatInEnglish] = await Promise.all([
    getCityDataInChinese(location),
    getCityDataInEnglish(location),
  ]);
  return {
    chinese: { state: cityDataInChinese.address.state },
    english: {
      state: cityDatInEnglish.address.state,
      suburb: cityDatInEnglish.address.suburb,
    },
  };
}
