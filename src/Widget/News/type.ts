export type NewsWidgetData = { tag: string[] };

export type NewsData = {
  author: string;
  content: string;
  description: string;
  publishedAt: string;
  source: { name: string };
  title: string;
  url: string;
  urlToImage: string;
};

export type AllNews = {
  [key: string]: { news: NewsData[]; updatedAt: string };
};
