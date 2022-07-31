export type GoogleCalendarListsResponse = {
  kind: string;
  etag: string;
  nextSyncToken: string;
  items: CalendarFromGoogle[];
  error?: { errors: string[]; message: string };
};

export type CalendarFromGoogle = {
  kind: string;
  etag: string;
  id: string;
  summary: string;
  description: string;
  timeZone: string;
  colorId: string;
  backgroundColor: string;
  foregroundColor: string;
  selected: boolean;
  accessRole: string;
  defaultReminderstring: string;
  conferenceProperties: {
    allowedConferenceSolutionTypes: string[];
  };
};

export type GoogleEventsResponse = {
  kind: string;
  etag: string;
  summary: string;
  updated: string;
  timeZone: string;
  accessRole: string;
  defaultReminders: string[];
  nextPageToken: string;
  items: EventFromGoogle[];
  error?: {
    code: number;
    message: string;
  };
};

export type EventFromGoogle = {
  kind: 'calendar#event';
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string;
  updated: string;
  summary: string;
  description: string;
  location: string;
  colorId: string;
  creator: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  organizer: {
    id: string;
    email: string;
    displayName: string;
    self: boolean;
  };
  start: {
    dateTime?: string;
    timeZone: string;
    date: string;
  };
  end: {
    dateTime?: string;
    timeZone: string;
    date: string;
  };
  endTimeUnspecified: boolean;
  recurrence: [string];
  recurringEventId: string;
  transparency: string;
  visibility: string;
  iCalUID: string;
  sequence: number;
  attendees: [
    {
      id: string;
      email: string;
      displayName: string;
      organizer: boolean;
      self: boolean;
      resource: boolean;
      optional: boolean;
      responseStatus: string;
      comment: string;
      additionalGuests: number;
    },
  ];
  attendeesOmitted: boolean;
  hangoutLink: string;
  conferenceData: {
    createRequest: {
      requestId: string;
      conferenceSolutionKey: {
        type: string;
      };
      status: {
        statusCode: string;
      };
    };
    entryPoints: [
      {
        entryPointType: string;
        uri: string;
        label: string;
        pin: string;
        accessCode: string;
        meetingCode: string;
        passcode: string;
        password: string;
      },
    ];
    conferenceSolution: {
      key: {
        type: string;
      };
      name: string;
      iconUri: string;
    };
    conferenceId: string;
    signature: string;
    notes: string;
  };
  gadget: {
    type: string;
    title: string;
    link: string;
    iconLink: string;
    width: number;
    height: number;
    display: string;
    preferences: {
      [key: string]: string;
    };
  };
  anyoneCanAddSelf: boolean;
  guestsCanInviteOthers: boolean;
  guestsCanModify: boolean;
  guestsCanSeeOtherGuests: boolean;
  privateCopy: boolean;
  locked: boolean;
  reminders: {
    useDefault: boolean;
    overrides: [
      {
        method: string;
        minutes: number;
      },
    ];
  };
  source: {
    url: string;
    title: string;
  };
  attachments: [
    {
      fileUrl: string;
      title: string;
      mimeType: string;
      iconLink: string;
      fileId: string;
    },
  ];
  eventType: string;
};

export type EventForFullCalendar = {
  id: string;
  title: string;
  url: string;
  start: string;
  end: string;
  backgroundColor: string;
  groupId?: string;
  allDay?: boolean;
  daysOfWeek?: number[];
  startTime?: string;
  endTime?: string;
};
