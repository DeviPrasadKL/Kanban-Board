import React from 'react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onTaskDrop: (taskId: number, newStatus: 'todo' | 'in-progress' | 'done') => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskDrop }) => {
  const handleDrop = (event: React.DragEvent<HTMLDivElement>, newStatus: 'todo' | 'in-progress' | 'done') => {
    event.preventDefault();
    const taskId = parseInt(event.dataTransfer.getData('taskId'), 10);
    onTaskDrop(taskId, newStatus);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div style={{ display: 'flex', gap:'0.5rem', flexWrap:'wrap' }}>
      <div
        onDrop={(event) => handleDrop(event, 'todo')}
        onDragOver={handleDragOver}
        className="task-list"
      >
        <h3>Todo</h3>
        {tasks.filter(task => task.status === 'todo').map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={(event) => event.dataTransfer.setData('taskId', task.id.toString())}
            className="task"
          >
            {task.content}
          </div>
        ))}
      </div>
      <div
        onDrop={(event) => handleDrop(event, 'in-progress')}
        onDragOver={handleDragOver}
        className="task-list"
      >
        <h3>In Progress</h3>
        {tasks.filter(task => task.status === 'in-progress').map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={(event) => event.dataTransfer.setData('taskId', task.id.toString())}
            className="task"
          >
            {task.content}
          </div>
        ))}
      </div>
      <div
        onDrop={(event) => handleDrop(event, 'done')}
        onDragOver={handleDragOver}
        className="task-list"
      >
        <h3>Done</h3>
        {tasks.filter(task => task.status === 'done').map(task => (
          <div
            key={task.id}
            draggable
            onDragStart={(event) => event.dataTransfer.setData('taskId', task.id.toString())}
            className="task"
          >
            {task.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
