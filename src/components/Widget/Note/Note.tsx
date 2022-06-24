import React, { useState, useRef } from 'react';
import Card from '../../Card';
import Title from './Title';
import Content from './Content';

function Note() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const contentRef = useRef<HTMLDivElement>(null);
  const onEnterInTitle = () => {
    if (!contentRef.current) return;
    contentRef.current.focus();
  };
  return (
    <Card>
      <Title title={title} setTitle={setTitle} onEnter={onEnterInTitle} />
      <Content
        content={content}
        setContent={setContent}
        contentRef={contentRef}
      />
    </Card>
  );
}

export default Note;
