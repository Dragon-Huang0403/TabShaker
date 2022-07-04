const url = 'https://tapshaker-server.herokuapp.com/news?';

export default async function fetchNews(countryName: string) {
  const endPoint = `${url}country=${countryName}`;
  const res = await fetch(endPoint);
  const data = await res.json();
  return data;
}
