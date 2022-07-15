import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Calendar from './Calendar';

export default function CalendarWidget() {
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
    >
      <Calendar />
    </GoogleOAuthProvider>
  );
}
