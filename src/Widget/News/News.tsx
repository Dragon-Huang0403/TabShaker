import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import fetchNews from '../../utils/newsApi';
import NewsItem from './NewsItem';
import type { NewsData } from '../../types/WidgetTypes';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.black};
  color: ${({ theme }) => theme.color.white};
  overflow-y: auto;
  padding: 5px 0px;
  border-radius: 10px;
`;

function News() {
  const [newsData, setNewsData] = useState<NewsData[]>([]);
  useEffect(() => {
    if (newsData.length > 0) return;
    const getNews = async () => {
      const data = await fetchNews();
      if (data.status === 'ok') {
        const articles = data.articles as NewsData[];
        setNewsData(articles);
      }
    };
    getNews();
  }, []);
  return (
    <Wrapper>
      {newsData.map((data, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <NewsItem data={data} key={index} />
      ))}
    </Wrapper>
  );
}

export default News;
