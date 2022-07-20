const url = 'https://api.unsplash.com';

export type UnsplashResponseData = {
  id: string;
  color?: string;
  urls: {
    raw?: string;
    url: string;
  };
  links: {
    html?: string;
  };
  user: {
    name?: string;
    links?: {
      html?: string;
    };
  };
  location: {
    title?: string | null;
  };
};

function handleDataFromUnsplash(rawData: UnsplashResponseData[]) {
  return rawData.map((photo) => ({
    id: photo.id,
    color: photo?.color,
    urls: { raw: photo?.urls?.raw, url: `${photo?.urls?.raw}&q=85&w=1920` },
    links: { html: photo?.links?.html },
    user: {
      name: photo?.user?.name,
      links: {
        html: photo?.user?.links?.html,
      },
    },
    location: {
      title: photo?.location?.title,
    },
  }));
}

export default async function getRandomPhotos() {
  try {
    const response = await fetch(
      `${url}/photos/random?count=10&collections=2183172`,
      {
        headers: {
          Authorization: `Client-ID ${process.env.REACT_APP_UNSPLASH_API_KEY}`,
        },
      },
    );
    const rawData: UnsplashResponseData[] = await response.json();
    const data = handleDataFromUnsplash(rawData);
    return { data };
  } catch (error) {
    return { error: "can't get photo" };
  }
}
