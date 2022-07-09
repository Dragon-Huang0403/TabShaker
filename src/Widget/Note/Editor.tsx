import React from 'react';
import './editor.css';

import { ListItemNode, ListNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { TRANSFORMERS } from '@lexical/markdown';

import RestoreContentPlugin from './RestoreContentPlugin';
import editorTheme from './editorTheme';
import EditorWrapper, { PlaceHolder } from './EditorWrapper';

function onError(error: any) {
  console.error(error);
}

const initialConfig = {
  namespace: 'MyEditor',
  theme: editorTheme,
  onError,
  nodes: [ListItemNode, ListNode],
};

interface EditorProps {
  onChange: (content: string) => void;
  content: string;
  editorRef: React.RefObject<HTMLDivElement>;
}

function Editor({ onChange, content, editorRef }: EditorProps) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorWrapper ref={editorRef}>
        <RichTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<PlaceHolder>Enter some text...</PlaceHolder>}
        />
        <HistoryPlugin />
        <ListPlugin />
        <MarkdownShortcutPlugin transformers={TRANSFORMERS} />
        <RestoreContentPlugin onChange={onChange} content={content} />
      </EditorWrapper>
    </LexicalComposer>
  );
}

export default Editor;
