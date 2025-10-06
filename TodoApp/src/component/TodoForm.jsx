import React, { useState } from 'react';
const TodoForm = ({ onAdd }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text);
      setText('');
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="todo-input"
          maxLength={100}
        />
        <button type="submit" className="add-button" disabled={!text.trim()}>
          <span className="button-icon">+</span>
          Add Task
        </button>
      </div>
    </form>
  );
};

export default TodoForm;