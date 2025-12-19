import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("tasks"));
    if (saved) setTasks(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    setTasks([...tasks, {
      id: Date.now(),
      text: input,
      completed: false
    }]);

    setInput("");
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t =>
      t.id === id ? { ...t, completed: !t.completed } : t
    ));
  };

  const editTask = (id) => {
    const newText = prompt("Edit task");
    if (!newText) return;

    setTasks(tasks.map(t =>
      t.id === id ? { ...t, text: newText } : t
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  return (
    <div className="container">
      <h1>TODO App</h1>

      <div className="input-section">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map(task => (
         <li key={task.id}>
  <div className="task-left">
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => toggleTask(task.id)}
    />
    <span className={task.completed ? "completed" : ""}>
      {task.text}
    </span>
  </div>

  <div className="task-actions">
    <button onClick={() => editTask(task.id)}>Edit</button>
    <button onClick={() => deleteTask(task.id)}>Delete</button>
  </div>
</li>

        ))}
      </ul>
    </div>
  );
}

export default App;
