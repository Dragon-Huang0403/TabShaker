import React from 'react';
import styled from 'styled-components';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import type { TodoData } from './Todo';

const Wrapper = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const StyledUl = styled.ul`
  margin: 0;
  margin-left: 10px;
  padding: 0;
  list-style: none;
  line-height: 1.2rem;
`;

interface TodosContainerProps {
  todos: TodoData[];
  onTodoModify: (e: ContentEditableEvent, id: string) => void;
  toggleChecked: (id: string) => void;
}

function TodosContainer({
  todos,
  onTodoModify,
  toggleChecked,
}: TodosContainerProps) {
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code !== 'Enter') return;
    e.preventDefault();
    e.stopPropagation();
    (document.activeElement as HTMLElement).blur();
  };

  return (
    <Wrapper>
      <StyledUl>
        {todos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.checked}
              onClick={() => {
                toggleChecked(todo.id);
              }}
            />
            <ContentEditable
              tagName="span"
              html={todo.text}
              onChange={(e) => {
                onTodoModify(e, todo.id);
              }}
              onKeyDown={onKeyDown}
            />
          </li>
        ))}
      </StyledUl>
    </Wrapper>
  );
}

export default TodosContainer;
