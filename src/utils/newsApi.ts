const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const headlinesUrl = 'https://newsapi.org/v2/top-headlines?';
const country = 'us';

export default async function fetchNews() {
  const endPoint = `${headlinesUrl}country=${country}&apiKey=${API_KEY}`;
  const reqUrl = new Request(endPoint);
  const res = await fetch(reqUrl);
  const data = await res.json();
  return data;
}
