import React, { useState } from 'react';

interface AddTaskProps {
  onAddTask: (content: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAddTask }) => {
  const [content, setContent] = useState('');

  const handleAddTask = () => {
    if (content.trim()) {
      onAddTask(content);
      setContent('');
    }
  };

  return (
    <div style={{paddingBottom:'1rem'}}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="New task"
      />
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default AddTask;
