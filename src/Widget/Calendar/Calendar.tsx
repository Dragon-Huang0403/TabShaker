import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import {
  getCalendarList,
  getCalendarEvents,
  handleEventsFromGoogleCalendar,
} from './googleApi';
import type { EventForFullCalendar } from './type';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.black};
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.color.white};
`;

function Calendar() {
  const [accessToken, setAccessToken] = useState('');
  const [events, setEvents] = useState<EventForFullCalendar[]>([]);

  const handleSuccess = (tokenResponse: TokenResponse) => {
    const token = tokenResponse.access_token;
    window.localStorage.setItem('googleAccessToken', token);
    setAccessToken(token);
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: console.log,
    scope: 'https://www.googleapis.com/auth/calendar',
  });

  const updateEventsFromGoogleCalendar = async () => {
    const calendarList = await getCalendarList(accessToken);
    const handleCalendarListData = async (
      id: string,
      backgroundColor: string,
      pageToken?: string,
    ) => {
      const eventsFromGoogle = await getCalendarEvents(
        accessToken,
        id,
        pageToken,
      );
      if (eventsFromGoogle.error) return;
      const handledEvents = handleEventsFromGoogleCalendar(
        eventsFromGoogle.items,
        backgroundColor,
      );
      setEvents((prevEvent) => [...prevEvent, ...handledEvents]);

      const { nextPageToken } = eventsFromGoogle;
      if (nextPageToken) {
        handleCalendarListData(id, backgroundColor, nextPageToken);
      }
    };
    calendarList.items.forEach(async (item) => {
      handleCalendarListData(item.id, item.backgroundColor);
    });
  };

  useEffect(() => {
    const oldToken = window.localStorage.getItem('googleAccessToken');
    if (oldToken) {
      setAccessToken(oldToken);
    }
  }, []);

  return (
    <Wrapper>
      <div>
        <button onClick={() => login()} type="button">
          Login
        </button>
        <button onClick={updateEventsFromGoogleCalendar} type="button">
          updateEventsFromGoogleCalendar
        </button>
      </div>
      <FullCalendar
        eventMaxStack={3}
        dayMaxEventRows={3}
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        events={events}
      />
    </Wrapper>
  );
}

export default Calendar;
