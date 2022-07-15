/* eslint-disable import/prefer-default-export */
const baseUrl = 'https://tapshaker-server.herokuapp.com/';

export async function fetchNews(countryName: string) {
  const url = `${baseUrl}news?country=${countryName}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}
