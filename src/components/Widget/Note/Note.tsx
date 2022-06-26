import React, { useRef } from 'react';
import Card from '../../Card';
import Title from './Title';
import Content from './Content';

interface NoteProps {
  data: { title: string; content: string };
  widgetOnChange: (onChangedData: { title?: string; content?: string }) => void;
}

function Note({ data, widgetOnChange }: NoteProps) {
  const { title, content } = data;
  const setTitle = (newTitle: string) => {
    widgetOnChange({ title: newTitle });
  };
  const setContent = (newContent: string) => {
    widgetOnChange({ content: newContent });
  };

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
