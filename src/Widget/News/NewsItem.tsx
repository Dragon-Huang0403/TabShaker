import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  padding: 5px 5px 5px 10px;
  gap: 10px;
  height: 100px;
  overflow-y: hidden;
  margin-bottom: 10px;
`;

const Photo = styled.div``;
const Img = styled.img`
  background: ${({ theme }) => theme.color.grey};
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 8px;
  object-fit: cover;
  object-position: center;
`;
const Title = styled.div`
  & > a:hover {
    text-decoration: underline;
  }
`;

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

interface NewsItemProps {
  newsData: NewsData;
}

function NewsItem({ newsData }: NewsItemProps) {
  const { title, url, urlToImage } = newsData;
  if (!urlToImage) return null;
  return (
    <Wrapper>
      <Photo>
        <a href={url}>
          <Img src={urlToImage} alt="news" />
        </a>
      </Photo>
      <Title>
        <a href={url}>{title}</a>
      </Title>
    </Wrapper>
  );
}

export default NewsItem;
