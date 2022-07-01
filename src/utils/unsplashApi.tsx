const url = 'https://api.unsplash.com';

interface UnsplashResponseData {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
  };
}

export default async function getRandomPhotos() {
  const response = await fetch(
    `${url}/photos/random?count=10&collections=1053828`,
    {
      headers: {
        Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
      },
    },
  );
  const data: UnsplashResponseData[] = await response.json();
  const photos = data.map((item: UnsplashResponseData) => ({
    id: item.id,
    imageUrl: `${item.urls.raw}&q=85&w=1920`,
  }));
  return photos;
}
