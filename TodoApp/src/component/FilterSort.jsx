import React from 'react';

const FilterSort = ({ filter, sortBy, onFilterChange, onSortChange, todoCount, completedCount }) => {
  return (
    <div className="filter-sort-container">
      <div className="stats-section">
        <div className="stat-item">
          <span className="stat-number">{todoCount}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedCount}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{todoCount - completedCount}</span>
          <span className="stat-label">Pending</span>
        </div>
      </div>

      <div className="controls-section">
        <div className="control-group">
          <label htmlFor="filter" className="control-label">Filter:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => onFilterChange(e.target.value)}
            className="control-select"
          >
            <option value="all">All Tasks</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="control-group">
          <label htmlFor="sort" className="control-label">Sort by:</label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="control-select"
          >
            <option value="date">Date Added</option>
            <option value="alphabetical">Alphabetical</option>
            <option value="priority">Priority</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;