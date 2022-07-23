export type TodoWidgetData = {
  todos: TodoData[];
  title: string;
};

export type TodoData = {
  id: string;
  text: string;
  checked: boolean;
  time: Date;
};
