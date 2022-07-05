const baseUrl = 'https://nominatim.openstreetmap.org/reverse?format=json';

export default async function getCityName(location: {
  lat: number;
  lon: number;
}) {
  const url = `${baseUrl}&lat=${location.lat}&lon=${location.lon}&zoom=18&addressdetails=1&accept-language=TW`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
