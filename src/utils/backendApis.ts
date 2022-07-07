import type { CodeResponse } from '@react-oauth/google';

const baseUrl = 'https://tapshaker-server.herokuapp.com/';

export async function fetchNews(countryName: string) {
  const url = `${baseUrl}news?country=${countryName}`;
  const res = await fetch(url);
  const data = await res.json();
  return data;
}

export async function getRefreshTokenAndAccessToken(
  authorizationCode: CodeResponse,
) {
  const url = `${baseUrl}login`;
  const fetchOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ authorizationCode }),
  };
  const res = await fetch(url, fetchOptions);
  const data = await res.json();
  return data;
}

export async function getNewAccessToken(refreshToken: string) {
  const url = `${baseUrl}refreshAccessToken`;
  const fetchOptions = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ refreshToken }),
  };
  const res = await fetch(url, fetchOptions);
  const data = await res.json();
  return data;
}
