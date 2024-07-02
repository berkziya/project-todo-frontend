import { useState, useEffect } from "react";
import "./App.css";
import trashIcon from "./assets/trash.svg";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!task) return;
    setTask("");

    const newTask = {
      id: new Date().getTime(),
      text: task,
      completed: false,
      completedDate: null
    };

    setTasks([newTask, ...tasks]);
  };

  const removeTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleCompletion = (id) => {
    setTasks((currentTasks) => {
      const updatedTasks = currentTasks.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed, completedDate: task.completed ? null : new Date() };
        }
        return task;
      });

      return updatedTasks.sort((a, b) => {
        if (!a.completed && !b.completed) {
          return b.completedDate - a.completedDate;
        }
        return a.completed ? 1 : -1;
      });
    });
  };

  return (
    <div className="App">
      <div className="inputs">
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Enter your task" value={task} onChange={(e) => setTask(e.target.value)} />
          <button type="submit">Add</button>
        </form>
      </div>
      <div className="toDoElements">
        {tasks.map((task) => (
          <div key={task.id} className={`task ${task.completed ? "completed" : ""}`}>
            <input type="checkbox" checked={task.completed} onChange={() => toggleCompletion(task.id)} />
            <span>{task.text}</span>
            <button onClick={() => removeTask(task.id)}>
              <img src={trashIcon} alt='Delete' />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;