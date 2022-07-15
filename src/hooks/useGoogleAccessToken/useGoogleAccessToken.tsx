import { useState, useEffect } from 'react';

declare const chrome: any;

function useGoogleAccessToken(
  setError: React.Dispatch<React.SetStateAction<string>>,
): [string, () => void] {
  const [accessToken, setAccessToken] = useState('');

  const clearTokens = () => {
    setAccessToken('');
  };

  useEffect(() => {
    if (chrome?.identity?.getAuthToken) {
      chrome.identity.getAuthToken({ interactive: true }, (token: string) => {
        window.localStorage.setItem('googleAccessToken', token);
        setAccessToken(token);
      });
      return;
    }
    setError("It's not run in Chrome, can't get access token");
  }, []);

  return [accessToken, clearTokens];
}

export default useGoogleAccessToken;
