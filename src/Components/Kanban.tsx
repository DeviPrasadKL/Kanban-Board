import { useEffect, useState } from 'react'
import AddTask from './AddTsk';
import TaskList from './TaskList';
import { Task } from '../types';

export default function Kanban() {
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
        <>
            <h1>Kanban Board</h1>
            <AddTask onAddTask={addTask} />
            <TaskList tasks={tasks} onTaskDrop={updateTaskStatus} />
        </>
    )
}
