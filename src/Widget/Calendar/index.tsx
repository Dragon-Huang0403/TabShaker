import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Calendar from './Calendar';

declare const chrome: any;

export default function CalendarWidget() {
  if (chrome?.identity) {
    return <Calendar />;
  }
  return (
    <GoogleOAuthProvider
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID as string}
    >
      <Calendar />
    </GoogleOAuthProvider>
  );
}
