const url = 'https://api.unsplash.com';

export type UnsplashResponseData = {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
  };
  links: {
    html: string;
  };
  user: {
    name: string;
    links: {
      html: string;
    };
  };
  location: {
    title: string;
  };
};

export default async function getRandomPhotos() {
  const response = await fetch(
    `${url}/photos/random?count=10&collections=2183172`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
      },
    },
  );
  const data: UnsplashResponseData[] = await response.json();
  return data;
}
