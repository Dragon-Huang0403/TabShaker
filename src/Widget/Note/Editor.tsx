import React from 'react';
import styled from 'styled-components';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import RestoreContentPlugin from './RestoreContentPlugin';

const EditorContainer = styled.div`
  position: relative;
  flex-grow: 1;
  height: 200px;
  overflow-y: auto;
  color: white;

  & > div:first-child {
    height: 100%;
    tab-size: 1;
    outline: 0;
    padding: 0px 10px 15px;
  }
  & > div:first-child:active {
    cursor: auto;
  }

  & p {
    margin: 0px;
  }
`;

const PlaceHolder = styled.div`
  color: ${({ theme }) => theme.color.lightGrey};
  overflow: hidden;
  position: absolute;
  top: 0px;
  left: 10px;
  user-select: none;
  pointer-events: none;
`;

const editorTheme = {
  ltr: 'ltr',
  rtl: 'rtl',
  placeholder: 'editor-placeholder',
  paragraph: 'editor-paragraph',
};

// function MyCustomAutoFocusPlugin() {
//   const [editor] = useLexicalComposerContext();

//   useEffect(() => {
//     // Focus the editor when the effect fires!
//     editor.focus();
//   }, [editor]);

//   return null;
// }

function onError(error: any) {
  console.error(error);
}

const initialConfig = {
  namespace: 'MyEditor',
  theme: editorTheme,
  onError,
};

interface EditorProps {
  onChange: (content: string) => void;
  content: string;
}

function Editor({ onChange, content }: EditorProps) {
  return (
    <LexicalComposer initialConfig={initialConfig}>
      <EditorContainer>
        <PlainTextPlugin
          contentEditable={<ContentEditable />}
          placeholder={<PlaceHolder>Enter some text...</PlaceHolder>}
        />

        <HistoryPlugin />
        <RestoreContentPlugin onChange={onChange} content={content} />
        {/* <MyCustomAutoFocusPlugin /> */}
      </EditorContainer>
    </LexicalComposer>
  );
}

export default Editor;
