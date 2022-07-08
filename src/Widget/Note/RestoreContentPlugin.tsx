import React, { useEffect, useState } from 'react';
import { EditorState } from 'lexical';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';

interface RestoreContentPluginProps {
  onChange: (content: string) => void;
  content: string;
}

function RestoreContentPlugin({
  onChange,
  content,
}: RestoreContentPluginProps) {
  const [editor] = useLexicalComposerContext();
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    if (!isFirstRender) return;
    setIsFirstRender(false);
    if (content) {
      const initialEditorState = editor.parseEditorState(content);
      editor.setEditorState(initialEditorState);
    }
  }, [isFirstRender, editor, content]);

  const handleOnChange = (editorState: EditorState) => {
    onChange(JSON.stringify(editorState.toJSON()));
  };
  return <OnChangePlugin onChange={handleOnChange} />;
}

export default RestoreContentPlugin;
