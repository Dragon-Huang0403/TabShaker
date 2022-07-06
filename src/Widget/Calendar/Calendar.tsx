import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  useGoogleLogin,
  googleLogout,
  TokenResponse,
} from '@react-oauth/google';
import getCalendarList from './googleApi';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.black};
  width: 100%;
  height: 100%;
`;

function Calendar() {
  const [accessToken, setAccessToken] = useState('');

  const handleSuccess = (tokenResponse: TokenResponse) => {
    console.log('tokenResponse', tokenResponse);
    const token = tokenResponse.access_token;
    window.localStorage.setItem('googleAccessToken', token);
    setAccessToken(token);
  };
  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: console.log,
    scope: 'https://www.googleapis.com/auth/calendar',
  });

  useEffect(() => {
    const oldToken = window.localStorage.getItem('googleAccessToken');
    if (oldToken) {
      setAccessToken(oldToken);
    }
  }, []);

  console.log(accessToken);

  return (
    <Wrapper>
      <button onClick={() => login()} type="button">
        Login
      </button>
      <button onClick={() => getCalendarList(accessToken)} type="button">
        getCalendarList
      </button>
      <button onClick={googleLogout} type="button">
        Logout
      </button>
    </Wrapper>
  );
}

export default Calendar;
