import React, { useRef } from 'react';
import styled, { css } from 'styled-components';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import type { TodoData } from './Todo';
import { Close } from '../../components/Icons';
import { useHover } from '../../hooks';

const Wrapper = styled.li<{ checked: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3px;
  ${({ theme, checked }) =>
    checked &&
    css`
      color: ${theme.lightGrey};
      text-decoration: line-through;
    `}
`;

const IconWrapper = styled.div`
  width: 20px;
  height: 20px;
  margin: 0px 5px;

  & > svg {
    fill: ${({ theme }) => theme.transparentWhite};
    width: 20px;
    height: 20px;
  }

  &:hover > svg {
    fill: ${({ theme }) => theme.white};
  }
`;

interface TodoItemProps {
  todo: TodoData;
  toggleChecked: (id: string) => void;
  onTodoModify: (e: ContentEditableEvent, id: string) => void;
  deleteTodo: (id: string) => void;
}

function TodoItem({
  todo,
  toggleChecked,
  onTodoModify,
  deleteTodo,
}: TodoItemProps) {
  const wrapperRef = useRef<HTMLLIElement>(null);
  const isHover = useHover(wrapperRef);
  const { checked, id, text } = todo;
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <Wrapper ref={wrapperRef} checked={checked}>
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          toggleChecked(id);
        }}
      />
      <ContentEditable
        style={{
          flexGrow: '1',
          border: 'none',
          outline: 'none',
          whiteSpace: 'pre',
          overflow: 'auto',
        }}
        html={text}
        onChange={(e) => {
          onTodoModify(e, id);
        }}
        onKeyDown={onKeyDown}
      />
      {isHover && (
        <IconWrapper
          onClick={() => {
            deleteTodo(id);
          }}
        >
          <Close />
        </IconWrapper>
      )}
    </Wrapper>
  );
}

export default TodoItem;
