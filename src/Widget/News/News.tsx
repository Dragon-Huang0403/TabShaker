import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';
import { fetchNews } from '../../utils/backendApis';
import NewsItem, { NewsData } from './NewsItem';
import { afterOneHour } from '../../utils/lib';
import useLocalStorage from '../../hooks/useLocalStorage';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.color.littleTransparentBlack};
  color: ${({ theme }) => theme.color.white};
  padding: 10px 5px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  padding-left: 10px;
  padding-bottom: 5px;
  font-size: 1.25rem;
  border-bottom: 3px solid ${({ theme }) => theme.color.white};
  margin-bottom: 10px;
`;

const NewsContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  flex-grow: 1;
  margin: auto;
`;

type AllNews = {
  [key: string]: { news: NewsData[]; updatedAt: string };
};

export interface NewsProps {
  data: { tag: string };
}

function News({ data }: NewsProps) {
  const [allNews, setAllNews] = useLocalStorage<AllNews>('allNewsData', {});
  const [isLoading, setIsLoading] = useState(true);
  const { tag } = data;
  const news = allNews[tag]?.news || [];
  const updatedAt = allNews[tag]?.updatedAt;

  useEffect(() => {
    if (updatedAt && !afterOneHour(updatedAt) && news.length > 0) {
      setIsLoading(false);
      return;
    }

    const getNews = async () => {
      setIsLoading(true);
      const res = await fetchNews(tag);
      if (res.status === 'ok') {
        const articles = res.articles as NewsData[];
        setAllNews({
          ...allNews,
          [tag]: { news: articles, updatedAt: String(new Date()) },
        });
        setIsLoading(false);
      }
    };

    getNews();
  }, [tag, news.length, updatedAt]);

  return (
    <Wrapper>
      <Title>Top Headlines</Title>
      {(news.length === 0 || isLoading) && (
        <LoadingWrapper>
          <ReactLoading type="spin" />
        </LoadingWrapper>
      )}
      <NewsContainer>
        {news.map((newsData, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <NewsItem newsData={newsData} key={index} />
        ))}
      </NewsContainer>
    </Wrapper>
  );
}

export default News;
