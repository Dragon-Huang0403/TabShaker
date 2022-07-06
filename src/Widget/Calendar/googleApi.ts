const baseUrl = 'https://www.googleapis.com/calendar/v3/users/me/';

export default async function getCalendarList(token: string) {
  const url = `${baseUrl}calendarList`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(url, { headers });
  const data = await res.json();
  console.log('data', data);
}
