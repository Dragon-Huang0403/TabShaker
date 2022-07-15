import { useState, useEffect } from 'react';
import { useGoogleLogin, CodeResponse } from '@react-oauth/google';
import {
  getRefreshTokenAndAccessToken,
  getNewAccessToken,
} from '../../utils/backendApis';

declare const chrome: any;

type GoogleTokens = {
  access_token: string;
  expiry_date: number;
  refresh_token?: string;
  scope: string;
  id_token: string;
  error?: string;
};

function useGoogleAccessToken(
  setError: React.Dispatch<React.SetStateAction<string>>,
): [string, () => void] {
  const [accessToken, setAccessToken] = useState('');

  const storeTokensInLocalStorage = (tokens: GoogleTokens) => {
    const newAccessToken = tokens.access_token as string;
    const expiryDate = tokens.expiry_date as number;

    window.localStorage.setItem('googleAccessToken', newAccessToken);
    window.localStorage.setItem(
      'googleAccessTokenExpiryDate',
      String(expiryDate),
    );
    const refreshToken = tokens.refresh_token as string;
    if (refreshToken) {
      window.localStorage.setItem('googleRefreshToken', refreshToken);
    }
  };

  const handleLoginSuccess = async (codeResponse: CodeResponse) => {
    const tokens = await getRefreshTokenAndAccessToken(codeResponse);
    storeTokensInLocalStorage(tokens);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: handleLoginSuccess,
    onError: () => {
      setError('Login Failed');
    },
    flow: 'auth-code',
    ux_mode: 'popup',
    scope: 'https://www.googleapis.com/auth/calendar.readonly',
  });

  const clearTokens = () => {
    setAccessToken('');
    window.localStorage.removeItem('googleAccessToken');
    window.localStorage.removeItem('googleAccessTokenExpiryDate');
    window.localStorage.removeItem('googleRefreshToken');
  };

  useEffect(() => {
    if (chrome?.identity?.getAuthToken) {
      chrome.identity.getAuthToken({ interactive: true }, (token: string) => {
        window.localStorage.setItem('googleAccessToken', token);
        setAccessToken(token);
      });
      return;
    }

    const refreshToken = window.localStorage.getItem('googleRefreshToken');
    if (!refreshToken) {
      googleLogin();
      return;
    }

    const getAccessTokenFromLocalStorage = () => {
      const oldAccessToken = window.localStorage.getItem('googleAccessToken');
      const oldAccessTokenExpiryDate = new Date(
        Number(window.localStorage.getItem('googleAccessTokenExpiryDate')),
      );
      const now = new Date();
      if (oldAccessToken && oldAccessTokenExpiryDate > now) {
        return oldAccessToken;
      }
      return '';
    };

    const oldToken = getAccessTokenFromLocalStorage();
    if (oldToken) {
      setAccessToken(oldToken);
      return;
    }

    const updateNewAccessToken = async () => {
      const tokens = (await getNewAccessToken(refreshToken)) as GoogleTokens;
      if (tokens.error) {
        setError(tokens.error);
        clearTokens();
        return;
      }
      storeTokensInLocalStorage(tokens);
      setAccessToken(tokens.access_token);
    };
    updateNewAccessToken();
  }, []);

  return [accessToken, clearTokens];
}

export default useGoogleAccessToken;
