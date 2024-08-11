import React, { useEffect, useState } from 'react';
import { Task } from './types';
import './App.css';
import AddTask from './Components/AddTsk';
import TaskList from './Components/TaskList';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    } else {
      console.error('Failed to parse tasks from local storage');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (content: string) => {
    const newTask: Task = {
      id: Date.now(),
      content,
      status: 'todo',
    };
    setTasks([...tasks, newTask]);
  };

  const updateTaskStatus = (taskId: number, newStatus: 'todo' | 'in-progress' | 'done') => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="App">
      <h1>Kanban Board</h1>
      <AddTask onAddTask={addTask} />
      <TaskList tasks={tasks} onTaskDrop={updateTaskStatus} />
    </div>
  );
};

export default App;
