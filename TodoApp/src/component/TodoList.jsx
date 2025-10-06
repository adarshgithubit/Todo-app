import React from 'react';
import TodoItem from './TodoItem';
import { ImFileEmpty } from "react-icons/im";

const TodoList = ({ todos, onToggle, onUpdate, onDelete }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
         <div className="empty-icon">
          <ImFileEmpty />
        </div>
        <h3>No tasks found</h3>
        <p>Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={onToggle}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default TodoList;