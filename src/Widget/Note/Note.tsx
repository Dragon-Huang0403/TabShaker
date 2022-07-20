import React, { useRef } from 'react';
import styled from 'styled-components';

import Title from './Title';
import Editor from './Editor';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.littleTransparentBlack};
  padding: 5px 0px 10px;
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

  const editorRef = useRef<HTMLDivElement>(null);
  const onEnterInTitle = () => {
    const contentEditor = editorRef.current?.childNodes?.[0] as HTMLElement;
    if (contentEditor) {
      contentEditor.focus();
    }
  };
  return (
    <Wrapper>
      <Title title={title} setTitle={setTitle} onEnter={onEnterInTitle} />
      <Editor
        onChange={onEditorChange}
        content={content}
        editorRef={editorRef}
      />
    </Wrapper>
  );
}

export default Note;
