import React, { useState } from 'react';
import styled from 'styled-components';
import { ContentEditableEvent } from 'react-contenteditable';
import { v4 } from 'uuid';
import IconDropDownMenu from '../../IconDropDownMenu';
import { ExpandMore } from '../../Icons';
import Card from '../../Card';
import TodoItem from './TodoItem';

export interface TodoData {
  id: string;
  text: string;
  checked: boolean;
  time: Date;
}

type ShowMode = 'Inbox' | 'Active' | 'Uncompleted';

const Wrapper = styled.div`
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
  margin-right: 5px;
`;

const Input = styled.input`
  width: 100%;
  background: transparent;
  color: ${({ theme }) => theme.white};
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

function Todo() {
  const [todos, setTodos] = useState<TodoData[]>([]);
  const [showMode, setShowMode] = useState<ShowMode>('Inbox');
  const [inputText, setInputText] = useState('');

  const onTodoModify = (e: ContentEditableEvent, targetId: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === targetId
          ? { ...prevTodo, text: e.target.value }
          : prevTodo,
      ),
    );
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const addTodo = () => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: v4(), text: inputText, checked: false, time: new Date() },
    ]);
    setInputText('');
  };

  const onInputSubmit = (e: React.KeyboardEvent) => {
    if (e.code !== 'Enter') return;
    if (inputText) {
      addTodo();
    }
    e.preventDefault();
    e.stopPropagation();
  };

  const toggleChecked = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, checked: !prevTodo.checked }
          : prevTodo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== id));
  };

  const getTodosByShowMode = () => {
    if (showMode === 'Uncompleted') {
      return todos.filter((todo) => !todo.checked);
    }
    if (showMode === 'Active') {
      return todos.filter((todo) => todo.checked);
    }
    return todos;
  };

  const menuItems = [
    {
      text: 'Inbox',
      onClick: () => {
        setShowMode('Inbox');
      },
    },
    {
      text: 'Active',
      onClick: () => {
        setShowMode('Active');
      },
    },
    {
      text: 'Uncompleted',
      onClick: () => {
        setShowMode('Uncompleted');
      },
    },
  ];

  const showedTodos = getTodosByShowMode();

  return (
    <Card>
      <Wrapper>
        <Header>
          <Title>{showMode}</Title>
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
          value={inputText}
          onChange={onInputChange}
          onKeyDown={onInputSubmit}
          placeholder="New Todo"
        />
      </Wrapper>
    </Card>
  );
}

export default Todo;
