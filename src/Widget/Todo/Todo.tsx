import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ContentEditable, { ContentEditableEvent } from 'react-contenteditable';
import { v4 } from 'uuid';
import IconDropDownMenu from '../../components/IconDropDownMenu';
import { ExpandMore } from '../../components/Icons';
import TodoItem from './TodoItem';

export interface TodoData {
  id: string;
  text: string;
  checked: boolean;
  time: Date;
}

const mode = ['All', 'Active', 'Completed'] as const;

type ShowMode = typeof mode[number];

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.littleTransparentBlack};
  color: ${({ theme }) => theme.color.white};
  border-radius: 10px;
  z-index: 0;
  padding: 5px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding-bottom: 5px;
  margin: 5px 0px;
  margin-left: 10px;
  position: relative;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 1.2rem;

  & > div {
    padding: 2px 6px;
  }
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.color.white};
  border: none;
  outline: none;
  font-size: 1rem;
  padding: 8px 8px 4px;
`;

const TodosContainer = styled.div`
  flex-grow: 1;
  overflow: auto;
`;

const StyledUl = styled.ul`
  margin: 0;
  margin-left: 10px;
  padding: 0;
  list-style: none;
`;

interface TodoProps {
  data: { todos: TodoData[]; title: string };
  onWidgetChange: (onChangedData: { todos: TodoData[]; title: string }) => void;
}

function Todo({ data, onWidgetChange }: TodoProps) {
  const { todos, title } = data;
  const setTodos = (newTodos: TodoData[]) => {
    onWidgetChange({ todos: newTodos, title });
  };
  const [showMode, setShowMode] = useState<ShowMode>('All');
  const [inputText, setInputText] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [isComposition, setIsComposition] = useState(false);

  const onTitleChange = (e: ContentEditableEvent) => {
    onWidgetChange({ todos, title: e.target.value });
  };

  const onTodoModify = (e: ContentEditableEvent, targetId: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === targetId ? { ...todo, text: e.target.value } : todo,
      ),
    );
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const addTodo = () => {
    setTodos([
      ...todos,
      { id: v4(), text: inputText, checked: false, time: new Date() },
    ]);
    setInputText('');
  };

  const onInputSubmit = (e: React.KeyboardEvent) => {
    if (e.key !== 'Enter') return;
    if (inputText && !isComposition) {
      addTodo();
      e.preventDefault();
      e.stopPropagation();
      if (showMode === 'Completed') setShowMode('All');
    }
  };

  const toggleChecked = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const getTodosByShowMode = () => {
    if (showMode === 'Completed') {
      return todos.filter((todo) => todo.checked);
    }
    if (showMode === 'Active') {
      return todos.filter((todo) => !todo.checked);
    }
    return todos;
  };

  const handleComposition = (e: React.CompositionEvent) => {
    const { type } = e;
    if (type === 'compositionstart') {
      setIsComposition(true);
      return;
    }
    setIsComposition(false);
  };

  const menuItems = mode.map((item) => ({
    text: item,
    onClick: () => {
      setShowMode(item);
    },
    checked: showMode === item,
  }));

  const showedTodos = getTodosByShowMode();

  return (
    <Wrapper>
      <Header>
        <Title>
          <ContentEditable
            html={title}
            onChange={onTitleChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                inputRef.current?.focus();
              }
            }}
          />
        </Title>
        <IconDropDownMenu items={menuItems} side="left" bulge>
          <ExpandMore />
        </IconDropDownMenu>
      </Header>
      <TodosContainer>
        <StyledUl>
          {showedTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              toggleChecked={toggleChecked}
              onTodoModify={onTodoModify}
              deleteTodo={deleteTodo}
            />
          ))}
        </StyledUl>
      </TodosContainer>
      <Input
        ref={inputRef}
        value={inputText}
        onChange={onInputChange}
        onKeyDown={onInputSubmit}
        placeholder="New Todo"
        onCompositionStart={handleComposition}
        onCompositionEnd={handleComposition}
      />
    </Wrapper>
  );
}

export default Todo;
