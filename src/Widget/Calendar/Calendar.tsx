import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import {
  getCalendarList,
  getCalendarEvents,
  handleEventsFromGoogleCalendar,
} from './googleApi';
import type { EventForFullCalendar } from './type';
import useGoogleAccessToken from '../../hooks/useGoogleAccessToken';

const Wrapper = styled.div`
  position: relative;
  background: ${({ theme }) => theme.color.littleTransparentBlack};
  width: 100%;
  height: 100%;
  padding: 15px;
  color: ${({ theme }) => theme.color.white};
  font-size: 1rem;
  border-radius: 10px;

  & .fc .fc-cell-shaded,
  & .fc .fc-day-disabled,
  & .fc-theme-standard .fc-popover {
    background: ${({ theme }) => theme.color.grey};
  }

  & .fc .fc-list-event:hover td {
    background: ${({ theme }) => theme.color.lavenderBlue};
    color: ${({ theme }) => theme.color.black};
  }

  & .fc-header-toolbar.fc-toolbar.fc-toolbar-ltr {
    padding-right: 30px;
  }

  & .fc-daygrid-dot-event:hover,
  .fc-daygrid-dot-event.fc-event-mirror {
    background: ${({ theme }) => theme.color.transparentWhite};
  }

  & .fc .fc-list-event-time {
    min-width: 100px;
    white-space: pre-wrap;
  }
  & .fc .fc-toolbar-title {
    font-size: 1.5rem;
  }
`;

function Calendar() {
  const [error, setError] = useState('');
  const [accessToken, clearTokens] = useGoogleAccessToken(setError);
  const [events, setEvents] = useState<EventForFullCalendar[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<FullCalendar>(null);
  const isModeUpdating = useRef(false);

  useEffect(() => {
    if (!accessToken || events.length > 0) return;
    const updateEventsFromGoogleCalendar = async () => {
      const calendarList = await getCalendarList(accessToken);
      if (calendarList.error) {
        clearTokens();
        setError(calendarList.error.message);
        return;
      }
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
    updateEventsFromGoogleCalendar();
  }, [accessToken]);

  useEffect(() => {
    const wrapper = wrapperRef.current!;
    let width = wrapper.clientWidth;
    if (events.length === 0) return;
    if (!calendarRef.current) return;
    if (isModeUpdating.current) return;
    const currentView = calendarRef.current!.getApi().view;

    const updateCalendarView = (
      viewMode: 'listWeek' | 'dayGridMonth',
      delay = 200,
    ) => {
      isModeUpdating.current = true;
      setTimeout(() => {
        if (wrapper.clientWidth !== width) {
          width = wrapper.clientWidth;
          updateCalendarView(viewMode, delay);
          return;
        }
        calendarRef.current!.getApi().changeView(viewMode);
        isModeUpdating.current = false;
      }, delay);
    };

    if (width <= 450) {
      if (currentView.type !== 'listWeek') {
        updateCalendarView('listWeek');
      }
    } else if (currentView.type !== 'dayGridMonth') {
      updateCalendarView('dayGridMonth', 500);
    }
  });

  return (
    <Wrapper ref={wrapperRef}>
      {error || (
        <FullCalendar
          ref={calendarRef}
          eventMaxStack={3}
          dayMaxEventRows={2}
          plugins={[dayGridPlugin, listPlugin]}
          initialView="listWeek"
          headerToolbar={{ left: 'title', center: '', right: 'prev,next' }}
          events={events}
          height="100%"
          views={{
            listWeek: {
              titleFormat: { month: 'short', day: 'numeric' },
            },
          }}
        />
      )}
    </Wrapper>
  );
}

export default Calendar;
