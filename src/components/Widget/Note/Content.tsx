/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useEffect } from 'react';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import styled from 'styled-components';

function isStartWithNumber(str: string) {
  const re = /^\d+/;
  return re.test(str);
}

const Wrapper = styled.div`
  width: 100%;
  flex: 1;
  padding: 4px 12px 12px;
  line-height: 1.5rem;
  font-size: 1.25rem;
  overflow-y: auto;

  &::-webkit-scrollbar {
    height: 16px;
    overflow: visible;
    width: 12px;
  }

  $::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  $::-webkit-scrollbar-corner {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    border-with: 1px 1px 1px 2px;
    background-color: rgba(255, 255, 255, 0.3);
  }

  & > div {
    height: 100%;
    border: none;
    outline: none;
  }
`;

interface ContentProps {
  content: string;
  setContent: (content: string) => void;
  contentRef: React.RefObject<HTMLElement>;
}

function Content({ content, setContent, contentRef }: ContentProps) {
  const nextLineOpening = useRef('');

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code !== 'Enter') return;
    const selection = window.getSelection();
    const textContent = selection?.focusNode?.textContent;
    if (!textContent) return;
    if (!isStartWithNumber(textContent)) return;
    const numberRe = /^\d+/;
    const number = textContent.match(numberRe);
    const numberLength = String(number).length;

    let followingFiller = '';
    if (number?.index !== undefined && number?.index <= textContent.length) {
      const followingFillerRe = /^./;
      [followingFiller] = textContent
        .slice(number.index + numberLength)
        .match(followingFillerRe) || [''];
    }

    const nextNumber = Number(number![0]) + 1;
    const newLineOpening = String(`${nextNumber}`) + followingFiller;

    if (!newLineOpening) return;
    nextLineOpening.current = newLineOpening;
    selection.focusNode.textContent += newLineOpening;
  };

  const onChange = (e: ContentEditableEvent) => {
    setContent(e.target.value);
  };

  useEffect(() => {
    if (!nextLineOpening.current) return;
    const selection = window.getSelection();
    const range = document.createRange();
    const textContent = selection?.focusNode?.textContent;
    if (!textContent || textContent.length < nextLineOpening.current.length)
      return;
    range.setStart(selection?.focusNode!, nextLineOpening.current.length);
    nextLineOpening.current = '';
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
