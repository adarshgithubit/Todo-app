import React, { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TodoForm from './component/TodoForm';
import FilterSort from './component/FilterSort';
import TodoList from './component/TodoList';

function App() {
    const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');

    useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

    useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

   const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'medium'
    };
    setTodos([newTodo, ...todos]);
  };

   const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

    const updateTodo = (id, newText) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, text: newText.trim() } : todo
    ));
  };

  // Delete todo
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // Filter todos based on selected filter
  const getFilteredTodos = () => {
    switch (filter) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'active':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  // Sort todos based on selected sort option
  const getSortedTodos = (todosToSort) => {
    const sorted = [...todosToSort];
    switch (sortBy) {
      case 'date':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return sorted.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
      case 'alphabetical':
        return sorted.sort((a, b) => a.text.localeCompare(b.text));
      default:
        return sorted;
    }
  };

  const filteredTodos = getFilteredTodos();
  const sortedTodos = getSortedTodos(filteredTodos);

  return (
    <>
    <div>
        <div className="todo-app">

      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">Todo App</h1>
          <p className="app-subtitle">Organize your life, one task at a time</p>
        </header>
        
        <div className="app-content">
          <TodoForm onAdd={addTodo} />
          <FilterSort
            filter={filter}
            sortBy={sortBy}
            onFilterChange={setFilter}
            onSortChange={setSortBy}
            todoCount={todos.length}
            completedCount={todos.filter(todo => todo.completed).length}
          />
          <TodoList
            todos={sortedTodos}
            onToggle={toggleTodo}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
          />
        </div>
      </div>
    </div>
    </div>
   
    </>
  )
}

export default App
