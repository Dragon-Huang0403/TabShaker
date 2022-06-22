import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Title from './Title';
import Content from './Content';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.black};
  width: 100%;
  height: 100%;
  padding: 5px;
  color: ${({ theme }) => theme.white};
  border-radius: 20px;
  z-index: 0;
  display: flex;
  flex-direction: column;
  box-shadow: -2px -2px 3px rgb(255 255 255 / 12%),
    2px 2px 3px rgb(255 255 255 / 12%);
`;

function Note() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const onEnterInTitle = () => {
    if (!contentRef.current) return;
    contentRef.current.focus();
  };
  return (
    <Wrapper>
      <Title title={title} setTitle={setTitle} onEnter={onEnterInTitle} />
      <Content
        content={content}
        setContent={setContent}
        contentRef={contentRef}
      />
    </Wrapper>
  );
}

export default Note;
