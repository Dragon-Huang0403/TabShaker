import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useGoogleLogin, TokenResponse } from '@react-oauth/google';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
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
  padding: 10px;
  display: flex;
  flex-direction: column;
  color: ${({ theme }) => theme.color.white};
`;

const CalendarWrapper = styled.div`
  width: 100%;
  flex-grow: 1;
  font-size: 0.75rem;

  & .fc .fc-cell-shaded,
  & .fc .fc-day-disabled {
    background: ${({ theme }) => theme.color.grey};
  }

  & .fc .fc-list-event:hover td {
    background: ${({ theme }) => theme.color.lavenderBlue};
    color: ${({ theme }) => theme.color.black};
  }
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
      <CalendarWrapper>
        <FullCalendar
          eventMaxStack={3}
          dayMaxEventRows={2}
          plugins={[dayGridPlugin, listPlugin]}
          initialView="listWeek"
          events={events}
          height="100%"
          themeSystem="bootstrap5"
        />
      </CalendarWrapper>
    </Wrapper>
  );
}

export default Calendar;
