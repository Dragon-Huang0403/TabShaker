import React, { useState } from 'react';
import styled from 'styled-components';
import { ContentEditableEvent } from 'react-contenteditable';
import { v4 } from 'uuid';
import IconDropDownMenu from '../../components/IconDropDownMenu';
import { ExpandMore } from '../../components/Icons';
import Card from '../../components/Card';
import TodoItem from './TodoItem';

export interface TodoData {
  id: string;
  text: string;
  checked: boolean;
  time: Date;
}

type ShowMode = 'Inbox' | 'Active' | 'Completed';

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
  data: { todos: TodoData[] };
  onWidgetChange: (onChangedData: { todos: TodoData[] }) => void;
}

function Todo({ data, onWidgetChange }: TodoProps) {
  const { todos } = data;
  const setTodos = (newTodos: TodoData[]) => {
    onWidgetChange({ todos: newTodos });
  };
  const [showMode, setShowMode] = useState<ShowMode>('Inbox');
  const [inputText, setInputText] = useState('');
  const [isComposition, setIsComposition] = useState(false);

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
    if (e.code !== 'Enter') return;
    if (inputText && !isComposition) {
      addTodo();
      e.preventDefault();
      e.stopPropagation();
      if (showMode === 'Completed') setShowMode('Inbox');
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
      text: 'Completed',
      onClick: () => {
        setShowMode('Completed');
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
          onCompositionStart={handleComposition}
          onCompositionEnd={handleComposition}
        />
      </Wrapper>
    </Card>
  );
}

export default Todo;
