import React, { useRef } from 'react';
import styled from 'styled-components';
import Title from './Title';
// import Content from './Content';
import Editor from './Editor';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.black};
  border-radius: 10px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
interface NoteProps {
  data: { title: string; content: string };
  onWidgetChange: (onChangedData: { title?: string; content?: string }) => void;
}

function Note({ data, onWidgetChange }: NoteProps) {
  const { title, content } = data;
  const setTitle = (newTitle: string) => {
    onWidgetChange({ title: newTitle, content });
  };

  const onEditorChange = (newContent: string) => {
    onWidgetChange({ title, content: newContent });
  };

  // const setContent = (newContent: string) => {
  //   onWidgetChange({ title, content: newContent });
  // };

  const contentRef = useRef<HTMLDivElement>(null);
  const onEnterInTitle = () => {
    if (!contentRef.current) return;
    contentRef.current.focus();
  };
  return (
    <Wrapper>
      <Title title={title} setTitle={setTitle} onEnter={onEnterInTitle} />

      <Editor onChange={onEditorChange} content={content} />

      {/* <Content
        content={content}
        setContent={setContent}
        contentRef={contentRef}
      /> */}
    </Wrapper>
  );
}

export default Note;
