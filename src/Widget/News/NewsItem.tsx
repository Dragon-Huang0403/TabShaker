import React from 'react';
import styled from 'styled-components';
import type { NewsData } from '../../types/WidgetTypes';

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

interface NewsItemProps {
  data: NewsData;
}

function NewsItem({ data }: NewsItemProps) {
  const { title, url, urlToImage } = data;
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
