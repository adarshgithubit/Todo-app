import React, { useState } from 'react';
import { FaEdit, FaSave, FaTrash, FaCheck } from 'react-icons/fa';

const TodoItem = ({ todo, onToggle, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (isEditing) {
      if (editText.trim() && editText !== todo.text) {
        onUpdate(todo.id, editText);
      } else {
        setEditText(todo.text);
      }
    }
    setIsEditing(!isEditing);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    onDelete(todo.id);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
      <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className="todo-content">
        <button
          className={`checkbox ${todo.completed ? 'checked' : ''}`}
          onClick={() => onToggle(todo.id)}
          aria-label={todo.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {todo.completed && <FaCheck className="checkmark" />}
        </button>

        <div className="todo-text-container">
          {isEditing ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyDown={handleKeyPress}
              onBlur={handleEdit}
              className="edit-input"
              autoFocus
              maxLength={100}
            />
          ) : (
            <span 
              className="todo-text"
              onDoubleClick={() => setIsEditing(true)}
            >
              {todo.text}
            </span>
          )}
          <div className="todo-meta">
            <span className="todo-date">{formatDate(todo.createdAt)}</span>
          </div>
        </div>
      </div>

      <div className="todo-actions">
        <button
          className="action-button edit-button"
          onClick={handleEdit}
          aria-label={isEditing ? 'Save changes' : 'Edit task'}
        >
          {isEditing ? <FaSave size={22} /> : <FaEdit size={22} />}
        </button>
        <button
          className="action-button delete-button"
          onClick={handleDelete}
          aria-label="Delete task"
        >
          <FaTrash size={22} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;