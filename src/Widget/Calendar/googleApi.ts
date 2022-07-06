import type {
  EventFromGoogle,
  EventForFullCalendar,
  GoogleCalendarListsResponse,
  GoogleEventsResponse,
} from './type';

const baseUrl = 'https://www.googleapis.com/calendar/v3/';

export async function getCalendarList(token: string) {
  const url = `${baseUrl}users/me/calendarList`;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(url, { headers });
  const data = await res.json();
  return data as GoogleCalendarListsResponse;
}

export function handleEventsFromGoogleCalendar(
  eventsFromGoogle: EventFromGoogle[],
  backgroundColor: string,
): EventForFullCalendar[] {
  return eventsFromGoogle.map((event) => ({
    id: event.id,
    title: event.summary,
    url: event.htmlLink,
    start: event.start?.dateTime || event.start?.date,
    end: event.end?.dateTime || event.end?.date,
    backgroundColor,
  }));
}

export async function getCalendarEvents(
  token: string,
  calendarId: string,
  pageToken?: string,
) {
  let url = `${baseUrl}calendars/${calendarId}/events`;
  if (pageToken) {
    url += `?pageToken=${pageToken}`;
  }
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  const res = await fetch(url, { headers });
  const data = await res.json();
  return data as GoogleEventsResponse;
}
