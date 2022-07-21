const baseUrl = 'https://tapshaker-server.herokuapp.com/';

export default async function fetchNews(countryName: string) {
  const url = `${baseUrl}news?country=${countryName}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
