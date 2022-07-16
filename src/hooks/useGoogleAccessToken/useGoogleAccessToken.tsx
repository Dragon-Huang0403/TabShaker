import { useState, useEffect } from 'react';

type Error = {
  status: number;
  text: string;
};

function useGoogleAccessToken(
  setError: React.Dispatch<React.SetStateAction<Error>>,
): [string, () => void, () => void] {
  const [accessToken, setAccessToken] = useState('');

  const clearTokens = () => {
    setAccessToken('');
  };

  const activeLogin = () => {
    chrome.identity.getAuthToken({ interactive: true }, (token: string) => {
      if (chrome.runtime.lastError) {
        setError({
          status: 1,
          text: `${chrome.runtime.lastError.message}, Please login to show calendar`,
        });
        return;
      }
      setAccessToken(token);
    });
  };

  useEffect(() => {
    if (chrome?.identity?.getAuthToken) {
      chrome.identity.getAuthToken({ interactive: false }, (token: string) => {
        if (chrome.runtime.lastError) {
          setError({
            status: 1,
            text: `${chrome.runtime.lastError.message}, Please login to show calendar`,
          });
          return;
        }
        setAccessToken(token);
      });
      return;
    }
    setError({
      status: 3,
      text: "It's not run in Chrome, can't get access token",
    });
  }, []);

  return [accessToken, clearTokens, activeLogin];
}

export default useGoogleAccessToken;
