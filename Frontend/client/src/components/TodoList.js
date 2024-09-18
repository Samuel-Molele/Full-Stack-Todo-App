import React, { useState, useEffect, useCallback } from "react";

import axios from "axios";

// TodoList component handles CRUD operations for a todo list
const TodoList = ({ token }) => {
  const [todo, setTodo] = useState([]); // State to hold the list of todo
  const [task, setTask] = useState(""); // State to hold the current task input
  const [editing, setEditing] = useState(null); // State to manage the ID of the todo being edited
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [error, setError] = useState(""); // State to manage error messages

  // Function to fetch the list of todo
  const fetchTodo = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/todo", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      setTodo(response.data); // Update the todo state with the fetched data
      setError("");
    } catch (err) {
      setError("Error fetching tasks. Please try again later.");
      console.error(
        "Error fetching tasks:",
        err.response ? err.response.data : err.message,
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  // Fetch todo on component mount and whenever the token changes
  useEffect(() => {
    if (token) fetchTodo();
  }, [fetchTodo, token]);

  // Function to handle adding a new task
  const handleAdd = async () => {
    if (!task.trim()) {
      setError("Task cannot be empty");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5000/api/todo",
        { task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setTask("");
      fetchTodo();
    } catch (err) {
      setError("Error adding task. Please try again.");
      console.error(
        "Error adding task:",
        err.response ? err.response.data : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to handle editing an existing task
  const handleEdit = async () => {
    if (!task.trim()) {
      setError("Task cannot be empty");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await axios.put(
        "http://localhost:5000/api/todo",
        { id: editing, task },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      setTask("");
      setEditing(null);
      fetchTodo();
    } catch (err) {
      setError("Error updating task. Please try again.");
      console.error(
        "Error updating task:",
        err.response ? err.response.data : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to handle deleting a task
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      await axios.delete("http://localhost:5000/api/todo", {
        headers: { Authorization: `Bearer ${token}` },
        data: { id },
      });
      fetchTodo();
    } catch (err) {
      setError("Error deleting task. Please try again.");
      console.error(
        "Error deleting task:",
        err.response ? err.response.data : err.message,
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Todo List</h2>

      {/* Display any error messages */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Input field for adding or editing tasks */}
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="New task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button
          onClick={editing ? handleEdit : handleAdd}
          disabled={loading}
          className="btn btn-primary"
        >
          {loading
            ? editing
              ? "Updating..."
              : "Adding..."
            : editing
              ? "Update Task"
              : "Add Task"}
        </button>
      </div>

      {/* List of tasks */}
      <ul className="list-group">
        {todo.map((task) => (
          <li
            key={task._id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {task.task}
            <div>
              {/* Button to edit a task */}
              <button
                onClick={() => {
                  setTask(task.task);
                  setEditing(task._id);
                }}
                className="btn btn-sm btn-secondary me-2"
              >
                Edit
              </button>
              {/* Button to delete a task */}
              <button
                onClick={() => handleDelete(task._id)}
                className="btn btn-sm btn-danger"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
