/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import styled from 'styled-components';

function startWithNumber(str: string) {
  const re = /^\d+[\s.]*/;
  const result = str.match(re);
  return result;
}

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  padding: 4px 12px 12px;
  line-height: 1.5rem;
  font-size: 1.25rem;
  overflow-y: auto;
  cursor: auto;

  & > div {
    height: 100%;
    border: none;
    outline: none;
    white-space: pre;
  }
`;

interface ContentProps {
  content: string;
  setContent: (content: string) => void;
  contentRef: React.RefObject<HTMLElement>;
}

function Content({ content, setContent, contentRef }: ContentProps) {
  const nextLineOpening = useRef<string[] | null>(null);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code !== 'Enter') return;
    const selection = window.getSelection();
    const focusNode = selection?.focusNode;
    if (!focusNode) return;
    const textContent = focusNode?.textContent;
    if (!textContent) return;
    const testResult = startWithNumber(textContent);
    if (!testResult) return;
    const lineOpening = testResult[0];
    if (textContent.length === lineOpening.length) {
      focusNode.textContent = '';
      return;
    }
    const numberRe = /^\d+/;
    const number = lineOpening.match(numberRe)![0];
    const followingFiller = lineOpening.slice(number.length);
    const nextNumber = String(Number(number) + 1);
    const newNextLineOpening = nextNumber + followingFiller;

    nextLineOpening.current = [newNextLineOpening, nextNumber, followingFiller];
    focusNode.textContent += newNextLineOpening;
  };

  const onChange = (e: ContentEditableEvent) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (!nextLineOpening.current) return;
    const selection = window.getSelection();
    const range = document.createRange();
    const focusNode = selection?.focusNode;
    const textContent = selection?.focusNode?.textContent;
    if (!focusNode || !textContent) return;
    if (textContent.length < nextLineOpening.current[0].length) return;
    if (textContent.length < nextLineOpening.current[0].length) return;
    range.setStart(focusNode, nextLineOpening.current[0].length);
    nextLineOpening.current = null;
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, [content]);
  return (
    <Wrapper>
      <ContentEditable
        innerRef={contentRef}
        onKeyDown={onKeyDown}
        html={content}
        onChange={onChange}
      />
    </Wrapper>
  );
}

export default Content;
